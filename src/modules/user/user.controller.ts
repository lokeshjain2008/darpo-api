import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('view_profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
