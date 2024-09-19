module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Admin123!",
  database: "nestApp",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
};
