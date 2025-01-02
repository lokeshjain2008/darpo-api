import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrganizationService } from './organization.service';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { RoomService } from './room.service';
import { AdminController } from './admin.controller';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule, PrismaModule],
  controllers: [AdminController],
  providers: [OrganizationService, UserService, PropertyService, RoomService],
  exports: [OrganizationService, UserService, PropertyService, RoomService],
})
export class AdminModule {}
