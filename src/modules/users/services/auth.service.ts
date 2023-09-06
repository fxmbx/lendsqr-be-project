import { IServiceResponse } from '@common/service.response';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { v4 as uuidv4 } from 'uuid';
import { JwtTokensResponse } from '../dtos/auth.dto';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';
import { CustomHttpException } from '../../../common/custom-http.exception';
import { CreateUserDto } from '../dtos';

@Injectable()
export class AuthService {
  private readonly tokens: { [key: string]: string } = {};
  constructor(@InjectModel() private readonly knex: Knex) {}

  async register(
    dto: CreateUserDto,
  ): Promise<IServiceResponse<JwtTokensResponse>> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user: IUser = await this.knex('users').insert({
      username: dto.username,
      password: hashedPassword,
    });

    const token = this.generateToken(user.id!);

    return {
      result: {
        accessToken: token,
      },
    };
  }

  async login(
    dto: CreateUserDto,
  ): Promise<IServiceResponse<JwtTokensResponse>> {
    const user: IUser = await this.knex('users')
      .where({ username: dto.username })
      .first();

    if (!user?.password) {
      throw new CustomHttpException('User not found', 404);
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password!);

    if (!passwordMatch) {
      throw new CustomHttpException('Invalid credentials', 404);
    }

    const token = this.generateToken(user.id!);

    return {
      result: {
        accessToken: token,
      },
    };
  }

  getUserFromToken(token: string): string | undefined {
    return this.tokens[token];
  }

  validateToken(token: string): string | null {
    const userId = this.tokens[token];
    if (userId) {
      return userId;
    }
    return null;
  }

  private generateToken(userId: string): string {
    const token = uuidv4();
    this.tokens[token] = userId;
    return token;
  }
}
