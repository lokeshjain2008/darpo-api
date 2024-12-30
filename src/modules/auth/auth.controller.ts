import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleAuthDto, SendOtpDto, VerifyOtpDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Initiate Google OAuth flow' })
  @ApiResponse({ status: 302, description: 'Redirects to Google login' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT token or indicates phone verification needed'
  })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.handleGoogleAuth(req.user);
  }

  @ApiOperation({ summary: 'Send OTP to phone number' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @Post('otp/send')
  async sendOtp(@Body() data: SendOtpDto) {
    return this.authService.sendOtp(data);
  }

  @ApiOperation({ summary: 'Verify OTP' })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT token on successful verification'
  })
  @Post('otp/verify')
  async verifyOtp(@Body() data: VerifyOtpDto) {
    return this.authService.verifyOtp(data);
  }
}