import { User } from '../models';

export const getUserProfile = async (userId: string): Promise<User> => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw Object.assign(new Error('User not found'), { status: 404 });
  }
  return user;
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<Pick<User, 'firstName' | 'lastName'>>
): Promise<User> => {
  const user = await getUserProfile(userId);
  await user.update(updates);
  return user;
};

export const getUserPreferences = async (userId: string): Promise<object> => {
  const user = await getUserProfile(userId);
  return user.preferences;
};

export const updateUserPreferences = async (userId: string, preferences: object): Promise<object> => {
  const user = await getUserProfile(userId);
  user.preferences = preferences;
  await user.save();
  return user.preferences;
};
