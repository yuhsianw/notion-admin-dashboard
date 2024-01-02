import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { CORS_ORIGIN, PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: CORS_ORIGIN }));
  await app.listen(PORT);
}
bootstrap();
