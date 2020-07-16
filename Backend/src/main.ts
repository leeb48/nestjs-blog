import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;
  await app.listen(port);

  logger.log(`Server started on port: ${port}`);
}
bootstrap();
