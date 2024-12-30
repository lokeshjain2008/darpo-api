import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { OtpService } from './otp.service';
import { GoogleAuthDto, VerifyOtpDto, SendOtpDto } from './dto';
import { User } from '@prisma/client';

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
        OR: [{ googleId: googleData.googleId }, { email: googleData.email }],
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
            googleId: 'Todo: Generate',
            email: 'Todo: Generate',
            name: 'Todo: Generate',
          },
        });
      }
    }

    return this.generateAuthResponse(user);
  }

  async updateSelectedProperty(userId: string, propertyId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.generateAuthResponse(user, propertyId);
  }

  private async generateAuthResponse(user: User, selectedProperty?: string) {
    /// Fetch properties the user has access to
    const userProperties = await this.prisma.userPropertyRole.findMany({
      where: { userId: user.id },
      include: { property: true },
    });

    const properties = userProperties.map(
      (userPropertyRole) => userPropertyRole.property,
    );

    if (properties.length === 1) {
      // Automatically select the first property if only one is available
      selectedProperty = properties.length === 1 ? properties[0].id : null;
    }

    // Generate JWT token
    const payload = {
      sub: user.id,
      propertIDs: properties.map((property) => property.id),
      selectedProperty,
    };

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        properties,
        selectedProperty: selectedProperty || properties[0]?.id || null,
      },
    };
  }
}
