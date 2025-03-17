import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://frontend-transportes.s3-website.us-east-2.amazonaws.com', // Permite solicitudes desde el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite enviar cookies y encabezados de autenticación
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://frontend-transportes.s3-website.us-east-2.amazonaws.com');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);  // Respondemos a la solicitud preflight
    }
    next();
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
