import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Swagger security for production
  if (process.env.NODE_ENV === 'production') {
    // Basic auth protection
    app.use('/api', basicAuth({
      challenge: true,
      users: { 
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD 
      }
    }));

    // IP restriction middleware
    const allowedIPs = process.env.ALLOWED_IPS?.split(',') || [];
    if (allowedIPs.length > 0) {
      app.use('/api', (req, res, next) => {
        if (allowedIPs.includes(req.ip)) {
          next();
        } else {
          res.status(403).send('Forbidden');
        }
      });
    }
  }

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Darpo API')
    .setDescription('Multi-tenant property management API with ABAC')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('organizations', 'Organization management')
    .addTag('properties', 'Property management')
    .addTag('rooms', 'Room management')
    .addTag('users', 'User management')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    ignoreGlobalPrefix: false
  });
  
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();