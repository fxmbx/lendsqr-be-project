import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '@modules/users/dtos';
import { IServiceResponse } from '@common/service.response';
import { JwtTokensResponse } from '@modules/users/dtos/auth.dto';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  const username = faker.person.firstName();
  const password = 'password';
  it('/users/register (POST) - should register a user', async () => {
    const createUserDto: CreateUserDto = {
      username,
      password,
    };

    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send(createUserDto)
      .expect(201);

    const result: IServiceResponse<JwtTokensResponse> = response.body;

    expect(result.result?.accessToken).toBeDefined();
  });

  it('/users/login (POST) - should log in a user', async () => {
    const loginDto: CreateUserDto = {
      username,
      password,
    };

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(loginDto)
      .expect(201);

    const result: IServiceResponse<JwtTokensResponse> = response.body;

    expect(result.result?.accessToken).toBeDefined();
  });
});
