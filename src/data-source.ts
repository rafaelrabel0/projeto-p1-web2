import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

// dialeto (linguagem) do banco de dados usado pelo TypeORM
const dialect = (process.env.DB_DIALECT || "mysql") as
  | "mysql"
  | "mariadb"
  | "postgres"
  | "mongodb";

export const AppDataSource = new DataSource({
  type: dialect,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [],
  migrations: [],
  subscribers: [],
});
