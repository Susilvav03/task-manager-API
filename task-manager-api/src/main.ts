import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3002;
  await app.listen(port);

  console.log(`Servidor ejecutándose en: http://localhost:${port}`);
  console.log(`Documentación Swagger: http://localhost:${port}/api`);
}
bootstrap();
