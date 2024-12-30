import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthDto, SendOtpDto, VerifyOtpDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SetPropertyDto } from './dto/set-property.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log(req);
    // Initiates Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.handleGoogleAuth(req.user);
  }

  @Post('otp/send')
  async sendOtp(@Body() data: SendOtpDto) {
    return this.authService.sendOtp(data);
  }

  @Post('otp/verify')
  async verifyOtp(@Body() data: VerifyOtpDto) {
    return this.authService.verifyOtp(data);
  }

  @Post('set-property')
  @UseGuards(JwtAuthGuard)
  async setProperty(@Req() req, @Body() setPropertyDto: SetPropertyDto) {
    const { user, token } = await this.authService.updateSelectedProperty(
      req.user.userId,
      setPropertyDto.propertyId,
    );
    return { message: 'Property selected successfully', token };
  }
}
