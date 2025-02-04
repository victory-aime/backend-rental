import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsUUID,
  IsEnum,
} from 'class-validator';

export class UsersDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'c12345',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(2)
  @ApiProperty({
    description: 'user name',
    example: 'john',
    required: true,
  })
  name?: string;

  @ApiProperty({
    description: 'user email',
    example: 'johndoe@exmaple.com',
    required: true,
  })
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(12)
  @ApiProperty({
    description: 'user password',
    example: '12345678john',
    required: true,
  })
  password?: string;
  providerId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Unique phone number',
    example: '51719140',
    required: false,
  })
  phone?: string;

  provider?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
