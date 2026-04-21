import fs from 'fs';
import path from 'path';
import { sequelize } from '../config/database';

const migrationsDir = path.join(__dirname, 'migrations');

const run = async (): Promise<void> => {
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    await sequelize.query(sql);
  }

  process.stdout.write('Migrations completed\n');
  await sequelize.close();
};

void run();
