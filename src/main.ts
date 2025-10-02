/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFillter } from './exceptions/fillters/http-exception.fillter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerErrorModule } from './common/error.model';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', 
    methods: ['GET','POST','PUT','DELETE'],
    credentials: false,
  });
  
  const configSwagger = new DocumentBuilder()
  .setTitle('MS-Record')
  .setDescription('Microsserviço de Registro de Refeições Servidas da Open RU')
  .addBearerAuth()
  .setVersion('1.0')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger, 
    {extraModels: [SwaggerErrorModule]});

  SwaggerModule.setup('swagger-ui', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  app.useGlobalFilters(new HttpExceptionFillter())
}
bootstrap();
