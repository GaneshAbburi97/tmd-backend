import { env } from '../config/environment';
import { logger } from '../middleware/logger';

export const sendEmail = async (to: string, subject: string, body: string): Promise<void> => {
  logger.info({ to, subject, from: env.emailFrom }, `Mock email sent: ${body}`);
};
