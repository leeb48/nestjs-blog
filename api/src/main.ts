import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const port = 5000;
  await app.listen(port);

  logger.log(`Server started on port: ${port}`);
}
bootstrap();
