export class GoogleAuthDto {
  email: string;
  googleId: string;
  name: string;
}

export class SendOtpDto {
  phoneNumber: string;
  userId?: string;
}

export class VerifyOtpDto {
  phoneNumber: string;
  otp: string;
  userId?: string;
}