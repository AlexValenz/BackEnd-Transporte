import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://18.223.180.64:4200', // Permite solicitudes desde el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite enviar cookies y encabezados de autenticación
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
