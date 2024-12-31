import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Length, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class GoogleAuthDto {
  @ApiProperty({
    description: 'User\'s email from Google',
    example: 'user@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Google ID',
    example: '123456789'
  })
  @IsString()
  googleId: string;

  @ApiProperty({
    description: 'User\'s full name',
    example: 'John Doe'
  })
  @IsString()
  name: string;
}

export class SendOtpDto {
  @ApiProperty({
    description: 'User\'s phone number',
    example: '+1234567890'
  })
  @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty({
    description: 'User ID if already registered',
    required: false,
    example: 'cuid1234'
  })
  @IsOptional()
  @IsString()
  userId?: string;
}

export class VerifyOtpDto {
  @ApiProperty({
    description: 'User\'s phone number',
    example: '+1234567890'
  })
  @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP received via SMS',
    example: '123456'
  })
  @IsString()
  @Length(6, 6)
  otp: string;

  @ApiProperty({
    description: 'User ID if already registered',
    required: false,
    example: 'cuid1234'
  })
  @IsOptional()
  @IsString()
  userId?: string;
}

export class SetPropertyDto {
  @ApiProperty({
    description: 'Property ID to set as current property',
    example: 'cuid1234'
  })
  @IsString()
  @IsNotEmpty()
  propertyId: string;
}