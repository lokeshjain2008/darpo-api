import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpService {
  private otpStore: Map<string, { otp: string; expires: Date }> = new Map();

  constructor(private configService: ConfigService) {}

  async generateAndSendOtp(phoneNumber: string): Promise<string> {
    const otp = this.generateOtp();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP
    this.otpStore.set(phoneNumber, { otp, expires });

    // TODO: Integrate with SMS service
    console.log(`OTP for ${phoneNumber}: ${otp}`);

    return otp;
  }

  async verifyOtp(phoneNumber: string, otp: string): Promise<boolean> {
    const stored = this.otpStore.get(phoneNumber);
    if (!stored || stored.expires < new Date()) {
      return false;
    }

    const isValid = stored.otp === otp;
    if (isValid) {
      this.otpStore.delete(phoneNumber);
    }

    return isValid;
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}