import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Importa tus interceptores
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- 1. CONFIGURACIÓN DE INTERCEPTORES Y PIPES ---

  // 🚀 Interceptores Globales (Manejo de Respuestas y Errores)
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ErrorInterceptor(),
  );

  // ✅ Pipes de Validación Globales (DTOs y Schemas)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades extra
      transform: true, // Convierte los tipos automáticamente (útil para DTOs)
    }),
  );

  // --- 2. CONFIGURACIÓN DE SWAGGER (DOCUMENTACIÓN) ---

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API para gestión de tareas con autenticación JWT')
    .setVersion('1.0')
    .addBearerAuth() // 🔒 Añade soporte para el token JWT en la interfaz de Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Documentación disponible en /api

  // --- 3. INICIO DEL SERVIDOR ---

  // Usa el puerto del .env (si está definido) o 3000 como default.
  // Notar que en los ejemplos usabas 3002 y 3000, elegimos 3000.
  const port = process.env.PORT || 3000; 
  
  await app.listen(port);

  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📘 Documentación disponible en http://localhost:${port}/api`);
}

bootstrap();