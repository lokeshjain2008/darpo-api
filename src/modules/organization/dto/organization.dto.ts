import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Organization name',
    example: 'Acme Corp'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Organization description',
    required: false,
    example: 'Leading provider of everything'
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateOrganizationDto {
  @ApiProperty({
    description: 'Organization name',
    required: false,
    example: 'Acme Corp Updated'
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Organization description',
    required: false,
    example: 'Updated description'
  })
  @IsOptional()
  @IsString()
  description?: string;
}