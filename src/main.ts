import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from "express"
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors({
    origin:"*"
  });
  app.use(express.static("."));

  // config swagger
  const config = new DocumentBuilder().setTitle("Api Capstone ORM").build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("/swagger",app,document);

  await app.listen(8080);
}
bootstrap();
