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
  describe('login', () => {
    it('should return access token when login is successful', async () => {
      const userData = {
        username: 'testuser',
        password: 'hashedPassword',
        id: 'userId',
      };
      mockedKnex.mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(userData),
      });
      bcryptMock.compare.mockImplementation(() => true);

      const dto: CreateUserDto = {
        username: 'testuser',
        password: 'password',
      };

      const result = await authService.login(dto);

      expect(result).toEqual({
        result: {
          accessToken: expect.any(String),
        },
      });
    });

    it('should throw CustomHttpException when user not found', async () => {
      mockedKnex.mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(null),
      });

      const dto: CreateUserDto = {
        username: 'nonexistentuser',
        password: 'password',
      };

      await expect(authService.login(dto)).rejects.toThrowError(
        'User not found',
      );
    });

    it('should throw CustomHttpException when invalid credentials', async () => {
      const userData = {
        username: 'testuser',
        password: 'hashedPassword',
      };
      mockedKnex.mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(userData),
      });
      bcryptMock.compare.mockImplementation(() => false);

      const dto: CreateUserDto = {
        username: 'testuser',
        password: 'wrongpassword',
      };

      await expect(authService.login(dto)).rejects.toThrowError(
        'Invalid credentials',
      );
    });
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
