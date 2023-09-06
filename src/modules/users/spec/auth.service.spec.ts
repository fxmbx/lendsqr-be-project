/* eslint-disable @typescript-eslint/no-var-requires */
import { CreateUserDto } from '../dtos';
import { AuthService } from '../services';
import bcrypt from 'bcrypt';

jest.mock('knex');
jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  const mockedKnex = require('knex');
  const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

  beforeEach(() => {
    authService = new AuthService(mockedKnex);
  });
  describe('register', () => {
    it('should return access token when registration is successful', async () => {
      mockedKnex.mockReturnValueOnce({
        insert: jest.fn().mockImplementation(() => 1),
      });
      bcryptMock.hash.mockImplementation(() => 'hashedPassword');

      const dto: CreateUserDto = {
        username: 'testuser',
        password: 'password',
      };

      const result = await authService.register(dto);

      expect(result).toEqual({
        result: {
          accessToken: expect.any(String),
        },
      });
    });

    it('should throw an error when registration fails', async () => {
      mockedKnex.mockReturnValueOnce(undefined);

      const dto: CreateUserDto = {
        username: 'existinguser',
        password: 'password',
      };

      await expect(authService.register(dto)).rejects.toThrowError();
    });
  });
});
