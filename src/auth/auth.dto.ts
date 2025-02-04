import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'johndoe@exmaple.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678john',
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
