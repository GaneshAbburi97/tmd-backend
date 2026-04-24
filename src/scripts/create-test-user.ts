/**
 * create-test-user.ts
 * 
 * Run this once to create a verified test user so you can log in immediately
 * without needing email verification.
 * 
 * Usage (from your tmd-backend folder):
 *   npx ts-node src/scripts/create-test-user.ts
 */

import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from '../config/database';
import '../models';
import { User } from '../models';
import bcrypt from 'bcrypt';

const TEST_EMAIL = 'test@tmd.com';
const TEST_PASSWORD = 'Test1234!';  // meets: uppercase, lowercase, digit, 8+ chars

const run = async (): Promise<void> => {
  await sequelize.sync();

  const existing = await User.findOne({ where: { email: TEST_EMAIL } });
  if (existing) {
    // If user exists but not verified, just mark them verified
    existing.isEmailVerified = true;
    existing.failedLoginAttempts = 0;
    existing.accountLockedUntil = null;
    await existing.save();
    console.log(`✅ Existing user updated — email verified. Login with:`);
  } else {
    const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);
    await User.create({
      email: TEST_EMAIL,
      passwordHash,
      firstName: 'Test',
      lastName: 'User',
      isEmailVerified: true,   // ← skip email verification
      preferences: {},
    });
    console.log(`✅ Test user created. Login with:`);
  }

  console.log(`   Email:    ${TEST_EMAIL}`);
  console.log(`   Password: ${TEST_PASSWORD}`);

  await sequelize.close();
};

void run().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
