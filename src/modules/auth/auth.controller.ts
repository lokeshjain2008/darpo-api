import { Controller, Post, Body, UseGuards, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleAuthDto, SendOtpDto, VerifyOtpDto, SetPropertyDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Initiate Google OAuth flow' })
  @ApiResponse({ status: 302, description: 'Redirects to Google login' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates Google OAuth flow
  }

  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT token or indicates phone verification needed'
  })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const result = await this.authService.handleGoogleAuth(req.user);
    
    if (result.needPhoneVerification) {
      // Redirect to phone verification page with userId
      return res.redirect(
        `${process.env.FRONTEND_URL}/verify-phone?userId=${result.userId}`
      );
    }

    // Redirect to dashboard with token
    return res.redirect(
      `${process.env.FRONTEND_URL}/dashboard?token=${result.accessToken}`
    );
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

  @ApiOperation({ summary: 'Set property for user' })
  @ApiResponse({ status: 200, description: 'Property set successfully' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: SetPropertyDto })
  @Post('set-property')
  async setProperty(@Req() req, @Body() data: SetPropertyDto) {
    return this.authService.setProperty(req.user.id, data.propertyId);
  }
}