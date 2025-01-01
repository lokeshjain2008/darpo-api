import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JWTAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

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

  await app.listen(3000);
}
bootstrap();
