import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { VisitorModule } from './modules/visitor/visitor.module';

@Module({
  imports: [AuthModule, VisitorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
