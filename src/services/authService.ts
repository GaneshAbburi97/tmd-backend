import { Op } from 'sequelize';
import { ACCOUNT_LOCK_MINUTES, MAX_FAILED_LOGIN_ATTEMPTS } from '../config/constants';
import { User } from '../models';
import { sendEmail } from '../utils/email';
import {
  generateAccessToken,
  generateRandomToken,
  generateRefreshToken,
  hashToken,
  verifyRefreshToken
} from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/password';
import { writeAuditLog } from './auditService';

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const getAuthPayload = (user: User) => ({ userId: user.id, email: user.email });

export const registerUser = async (input: RegisterInput): Promise<{ user: User; verificationToken: string }> => {
  const existing = await User.findOne({ where: { email: input.email.toLowerCase() } });
  if (existing) {
    throw Object.assign(new Error('Email is already registered'), { status: 409 });
  }

  const verificationToken = generateRandomToken();
  const user = await User.create({
    ...input,
    email: input.email.toLowerCase(),
    passwordHash: await hashPassword(input.password),
    emailVerificationTokenHash: hashToken(verificationToken)
  });

  await sendEmail(user.email, 'Verify your email', `Use token: ${verificationToken}`);
  await writeAuditLog('user', user.id, 'register', user.id);
  return { user, verificationToken };
};

export const verifyEmail = async (token: string): Promise<void> => {
  const user = await User.findOne({ where: { emailVerificationTokenHash: hashToken(token) } });
  if (!user) {
    throw Object.assign(new Error('Invalid verification token'), { status: 400 });
  }
  user.isEmailVerified = true;
  user.emailVerificationTokenHash = null;
  await user.save();
};

export const loginUser = async (input: LoginInput): Promise<{ accessToken: string; refreshToken: string; user: User }> => {
  const user = await User.findOne({ where: { email: input.email.toLowerCase() } });
  if (!user) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  }

  if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
    throw Object.assign(new Error('Account locked. Try again later.'), { status: 423 });
  }

  const valid = await comparePassword(input.password, user.passwordHash);
  if (!valid) {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
      user.accountLockedUntil = new Date(Date.now() + ACCOUNT_LOCK_MINUTES * 60 * 1000);
      user.failedLoginAttempts = 0;
    }
    await user.save();
    throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  }

  if (!user.isEmailVerified) {
    throw Object.assign(new Error('Please verify your email before logging in'), { status: 403 });
  }

  user.failedLoginAttempts = 0;
  user.accountLockedUntil = null;

  const payload = getAuthPayload(user);
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  user.refreshTokenHash = hashToken(refreshToken);
  await user.save();

  await writeAuditLog('user', user.id, 'login', user.id);
  return { accessToken, refreshToken, user };
};

export const refreshUserToken = async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
  const payload = verifyRefreshToken(refreshToken);
  const user = await User.findByPk(payload.userId);
  if (!user || !user.refreshTokenHash || user.refreshTokenHash !== hashToken(refreshToken)) {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }

  const newPayload = getAuthPayload(user);
  const newAccessToken = generateAccessToken(newPayload);
  const newRefreshToken = generateRefreshToken(newPayload);

  user.refreshTokenHash = hashToken(newRefreshToken);
  await user.save();

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (userId: string): Promise<void> => {
  await User.update({ refreshTokenHash: null }, { where: { id: userId } });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (!user) {
    return;
  }

  const token = generateRandomToken();
  user.resetPasswordTokenHash = hashToken(token);
  user.resetPasswordExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  await sendEmail(user.email, 'Reset password', `Use token: ${token}`);
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  const tokenHash = hashToken(token);
  const user = await User.findOne({
    where: {
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpiresAt: { [Op.gt]: new Date() }
    }
  });

  if (!user) {
    throw Object.assign(new Error('Invalid or expired reset token'), { status: 400 });
  }

  user.passwordHash = await hashPassword(password);
  user.resetPasswordTokenHash = null;
  user.resetPasswordExpiresAt = null;
  user.refreshTokenHash = null;
  await user.save();
};
