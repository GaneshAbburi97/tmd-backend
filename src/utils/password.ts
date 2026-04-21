import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../config/constants';

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
export const comparePassword = async (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);
