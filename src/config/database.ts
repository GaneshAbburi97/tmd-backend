import { Sequelize } from 'sequelize';
import { env } from './environment';

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: env.databaseUrl.startsWith('sqlite') ? 'sqlite' : 'postgres',
  logging: false
});

export const connectDatabase = async (): Promise<void> => {
  await sequelize.authenticate();
};
