import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databases = [
  process.env.DB_DATABASE,
  process.env.DB_DATABASE_TEST,
  process.env.DB_DATABASE_PRODUCTION,
];

const createDatabaseIfNotExists = async (dbName: string) => {
  const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // Connect to default database to run the check
  });

  try {
    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (error) {
    console.error(`Error creating database ${dbName}:`, error);
  } finally {
    await client.end();
  }
};

const createDatabases = async () => {
  for (const dbName of databases) {
    if (dbName) {
      await createDatabaseIfNotExists(dbName);
    }
  }
};

createDatabases().then(() => {
  console.log('Database check and creation process completed.');
}).catch(error => {
  console.error('Error during database check and creation process:', error);
});
