import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UsersService, UsersDto } from '../users';
import { PrismaService, CookiesService, TokenService } from '_config/services';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly cookieService: CookiesService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async refreshTokens(refreshToken: string, res: Response) {
    try {
      const payload = this.tokenService.verifyRefreshToken(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, role: true, refreshToken: true },
      });

      if (!user || !user.refreshToken)
        throw new UnauthorizedException('Aucun Refresh Token trouvé');

      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isValid) throw new UnauthorizedException('Refresh Token invalide');

      const [newAccessToken, newRefreshToken] = await Promise.all([
        this.tokenService.generateAccessToken(user.id, user.role),
        this.tokenService.generateRefreshToken(user.id),
      ]);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: await bcrypt.hash(newRefreshToken, 12) },
      });

      this.cookieService.setRefreshTokenCookie(res, newRefreshToken);

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(user: UsersDto, res: Response) {
    const { password: _, ...userWithoutPassword } = user;
    const access_token = this.tokenService.generateAccessToken(
      userWithoutPassword.id,
      userWithoutPassword.role,
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      userWithoutPassword.id,
    );
    await this.prisma.user.update({
      where: { id: userWithoutPassword.id },
      data: { refreshToken: await bcrypt.hash(refreshToken, 12) },
    });

    this.cookieService.setRefreshTokenCookie(res, refreshToken);

    return { access_token, user: { ...userWithoutPassword } };
  }

  async signUp(user: UsersDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new ConflictException('Cannot create user');
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    return this.prisma.user.create({
      data: {
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
    });
  }

  async logout(userId: string, res: Response) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
      this.cookieService.clearRefreshTokenCookie(res);
    } catch (error) {
      throw new UnauthorizedException('Failed to logout');
    }
  }
}
