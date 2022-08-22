import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

import { AppModule } from './app.module';
const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
ConfigModule.forRoot();

async function bootstrap() {
  initializeApp({
    credential: credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    })
  })

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
