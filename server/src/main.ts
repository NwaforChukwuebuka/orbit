import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { TransformInterceptor } from './common/interceptors/transformer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TransformInterceptor(),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
