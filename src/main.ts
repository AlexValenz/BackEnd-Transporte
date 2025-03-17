import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://frontend-transportes.s3-website.us-east-2.amazonaws.com', // Permite solicitudes desde el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite enviar cookies y encabezados de autenticación
  });

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
