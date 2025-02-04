import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Res,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SWAGGER_TAGS } from '_config/enum/global.enum';
import { APIS_URL } from '_config/endpoints/api';
import { SignInDto } from './auth.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersDto } from 'src/users';
import { JwtAuthGuard } from '_config/guard';

@ApiTags(SWAGGER_TAGS.AUTH_MANAGEMENT)
@Controller(APIS_URL.AUTH_MANAGEMENT.GLOBAL_ROUTES)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(APIS_URL.AUTH_MANAGEMENT.SIGN_IN)
  @ApiBody({
    description: 'Data required to login',
    type: SignInDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged in successfully', user: user });
  }

  @Post(APIS_URL.AUTH_MANAGEMENT.SIGN_UP)
  @ApiBody({
    description: 'Data required to register',
    type: UsersDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  async signUp(@Body() usersDto: UsersDto, @Res() res: Response) {
    await this.authService.signUp(usersDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Registered successfully' });
  }

  @Post(APIS_URL.AUTH_MANAGEMENT.REFRESH_TOKEN)
  async refresh(@Req() req, @Res() res: Response) {
    if (!req.cookies.refreshToken)
      throw new UnauthorizedException('Aucun Refresh Token trouvé');
    const newTokens = await this.authService.refreshTokens(
      req.cookies.refreshToken,
      res,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Token refreshed successfully',
      access_token: newTokens,
    });
  }

  @Post(APIS_URL.AUTH_MANAGEMENT.LOGOUT)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged out',
  })
  async logout(@Req() req, @Res() res: Response) {
    await this.authService.logout(req.user.sub, res);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged out successfully' });
  }
}
