import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {resolve } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve('./public'));
  app.setBaseViewsDir(resolve('./views'));  
  app.setViewEngine('ejs');

  await app.listen(8000);
}
bootstrap();


