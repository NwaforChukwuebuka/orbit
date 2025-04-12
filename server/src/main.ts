import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { TransformInterceptor } from './common/interceptors/transformer.interceptor';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import * as bodyParser from 'body-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '10mb' }));
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TransformInterceptor(),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Orbit WorkSpace API')
    .setDescription('Orbit WorkSpace API Swagger Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, document);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
