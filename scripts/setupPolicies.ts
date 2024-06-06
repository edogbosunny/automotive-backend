import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const setupPolicies = async () => {
  const sql = fs.readFileSync(path.join(__dirname, 'setup_policies.sql'), 'utf8');
  await sequelize.query(sql);
};

setupPolicies()
  .then(() => {
    console.log('Policies setup successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error setting up policies:', error);
    process.exit(1);
  });
