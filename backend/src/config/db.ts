import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

// --env-variables--
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

export const myDataSource = new DataSource({
  type: 'mysql',
  port: Number(DB_PORT),
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['src/entity/*.ts'], // here add the entities
  migrations: ["src/migrations/*.ts"], 
  logging: true,
  synchronize: false, // true ila kenti briti tzide tableau jdade
});

export const connectDB = async (): Promise<void> => {
  try {
    await myDataSource.initialize();
    console.log('Data Source haas been initialized 👍');
  } catch (error) {
    console.error('Error during data Source initialization: ', error);
  }
};
