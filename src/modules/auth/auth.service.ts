import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { OtpService } from './otp.service';
import { GoogleAuthDto, VerifyOtpDto, SendOtpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  async handleGoogleAuth(googleData: GoogleAuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { googleId: googleData.googleId },
          { email: googleData.email },
        ],
      },
    });

    if (!user) {
      // Create new user
      const newUser = await this.prisma.user.create({
        data: {
          email: googleData.email,
          googleId: googleData.googleId,
          name: googleData.name,
        },
      });
      
      return {
        needPhoneVerification: true,
        userId: newUser.id,
      };
    }

    if (!user.isPhoneVerified) {
      return {
        needPhoneVerification: true,
        userId: user.id,
      };
    }

    return this.generateAuthResponse(user);
  }

  async sendOtp(data: SendOtpDto) {
    const { phoneNumber, userId } = data;
    
    // Generate and send OTP
    const otp = await this.otpService.generateAndSendOtp(phoneNumber);
    
    // Update user's phone number if provided
    if (userId) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { phoneNumber },
      });
    }

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(data: VerifyOtpDto) {
    const { phoneNumber, otp, userId } = data;
    
    const isValid = await this.otpService.verifyOtp(phoneNumber, otp);
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    let user;
    if (userId) {
      // Update existing user
      user = await this.prisma.user.update({
        where: { id: userId },
        data: { isPhoneVerified: true },
      });
    } else {
      // Find or create user by phone number
      user = await this.prisma.user.findFirst({
        where: { phoneNumber },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            phoneNumber,
            isPhoneVerified: true,
          },
        });
      }
    }

    return this.generateAuthResponse(user);
  }

  private generateAuthResponse(user: any) {
    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: user.name,
      },
    };
  }
}