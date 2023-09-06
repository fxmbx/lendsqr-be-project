import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { IServiceResponse } from '@common/service.response';
import { JwtTokensResponse } from '../dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@Controller({ path: 'users', version: '1' })
@ApiTags('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<IServiceResponse<JwtTokensResponse>> {
    return this.authService.register(dto);
  }
}
