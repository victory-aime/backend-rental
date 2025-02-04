import { Controller } from '@nestjs/common';
import { UsersService } from './';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '_config/enum/global.enum';
import { APIS_URL } from '_config/endpoints/api';

@ApiTags(SWAGGER_TAGS.USER_MANAGEMENT)
@Controller(APIS_URL.USER_MANAGEMENT.GLOBAL_ROUTES)
export class UsersController {
  constructor(private usersService: UsersService) {}
}
