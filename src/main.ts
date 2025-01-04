import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JWTAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://your-react-app-domain.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Use JWTAuthGuard globally
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JWTAuthGuard(reflector));

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Darpo API')
    .setDescription('The Darpo API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
