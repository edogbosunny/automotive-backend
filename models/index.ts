import { Sequelize } from 'sequelize-typescript';
import { Dealership } from './dealership';
import { Vehicle } from './vehicle';
import { Customer } from './customer';
import { Sale } from './sale';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  models: [Dealership, Vehicle, Customer, Sale]
});

export default sequelize;
