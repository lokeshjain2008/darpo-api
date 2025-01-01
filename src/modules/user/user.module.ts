import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}