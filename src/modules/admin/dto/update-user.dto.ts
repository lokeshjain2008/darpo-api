
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    required: false
  })
  firstName?: string;

  @ApiProperty({
    description: 'The last name of the user', 
    example: 'Doe',
    required: false
  })
  lastName?: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    required: false
  })
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
    required: false
  })
  password?: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
    required: false
  })
  phone?: string;

  @ApiProperty({
    description: 'Whether the user is active',
    example: true,
    required: false
  })
  isActive?: boolean;
}