import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookiesService {
  private readonly isProduction = process.env.NODE_ENV === 'production';

  setRefreshTokenCookie(res: Response, token: string) {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  clearRefreshTokenCookie(res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: 'strict',
    });
  }

  setAccessTokenCookie(res: Response, token: string) {
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
  }

  clearAccessTokenCookie(res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: 'strict',
    });
  }
}
