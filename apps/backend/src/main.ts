import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MainModule } from '@clickvote/backend/src/main.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.enableCors({
    origin: [process.env.FRONT_END_URL],
    credentials: true
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
