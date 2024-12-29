/**
 * This module is used to share common dependencies between modules.
 * Add any dependencies that are used by multiple modules here.
 * e.g. PrismaModule, ConfigModule, etc.
 *
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../modules/prisma/prisma.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PrismaModule,
  ],
  exports: [ConfigModule, PrismaModule],
})
export class CommonModule {}
