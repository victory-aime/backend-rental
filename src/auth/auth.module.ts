import { JwtModule } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';
import * as process from 'process';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users';
import { PrismaService } from '_config/services/prisma.db.service';
import { CookiesService } from '_config/services/cookies.service';
import { TokenService } from '_config/services/token.service';
import { JwtStrategy } from '_config/strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    CookiesService,
    TokenService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
