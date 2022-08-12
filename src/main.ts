import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppModule } from './app.module';

ConfigModule.forRoot();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
