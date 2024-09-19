import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { AppDataSource } from "./data-source.js";

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");

    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(3001);
    console.log("Application is running on: http://localhost:3001");
  } catch (error) {
    console.error("Error during Data Source initialization", error);
    process.exit(1);
  }
}
bootstrap();
