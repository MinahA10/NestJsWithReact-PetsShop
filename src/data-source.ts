import { DataSource } from "typeorm";
import { User } from "./users/users.entity";
import { Product } from "./product/entities/Product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Admin123!",
  database: "nestApp",
  entities: [User, Product],
  migrations: [__dirname + "/migrations/*.ts"],
  synchronize: false,
});
