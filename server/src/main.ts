import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { CORS_ORIGIN, DEFAULT_PORT } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: CORS_ORIGIN }));
  /**
   * Start the server and listen on the port in the environment variable PORT.
   * @see: https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
   */
  console.log(`Listening on port ${process.env.PORT ?? DEFAULT_PORT}`);
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
