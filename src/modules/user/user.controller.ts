import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(PermissionsGuard)
  @Permissions('view_profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
