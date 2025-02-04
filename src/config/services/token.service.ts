import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(userId: string, role: string): string {
    return this.jwtService.sign(
      { sub: userId, role },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '15m',
      },
    );
  }

  generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      },
    );
  }

  verifyAccessToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  verifyRefreshToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: process.env.REFRESH_SECRET,
    });
  }
}
