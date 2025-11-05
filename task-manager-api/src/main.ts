import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🚀 Registrar el interceptor global
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ErrorInterceptor(),
  );

  const port = process.env.PORT ?? 3002;
  await app.listen(port);

  console.log(`Servidor ejecutándose en: http://localhost:${port}`);
  console.log(`Documentación Swagger: http://localhost:${port}/api`);
}
bootstrap();
