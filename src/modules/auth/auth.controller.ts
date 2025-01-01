import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthDto, SendOtpDto, VerifyOtpDto } from './dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { SetPropertyDto } from './dto/set-property.dto';
import { OAuth2Client } from 'google-auth-library';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  private oauthClient: OAuth2Client;
  constructor(private authService: AuthService) {
    this.oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log(req);
    // Initiates Google OAuth flow
  }

  @Get('google/callback')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.handleGoogleAuth(req.user);
  }

  @Post('google/callback')
  @Public()
  async googleAuthCallback(@Body('token') token: string) {
    // This route is used by the mobile app to authenticate the user
    // using the token received from Google OAuth flow initiated by the app/web (clientside).
    if (!token) {
      throw new Error('Token is required');
    }
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    return this.authService.handleGoogleAuth({ email, name, googleId });
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
  async setProperty(@Req() req, @Body() setPropertyDto: SetPropertyDto) {
    const { user, token } = await this.authService.updateSelectedProperty(
      req.user.userId,
      setPropertyDto.propertyId,
    );
    return { message: 'Property selected successfully', token };
  }
}
