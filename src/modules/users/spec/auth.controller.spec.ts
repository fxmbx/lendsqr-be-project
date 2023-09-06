import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../services';
import { UsersController } from '../controllers';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dtos';
import { CustomHttpException } from '../../../common/custom-http.exception';
import { IServiceResponse } from '@common/service.response';
import { JwtTokensResponse } from '../dtos/auth.dto';
import { describe } from 'node:test';

const accessToken = uuidv4();

describe('UsersController', () => {
  let controller: UsersController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest
              .fn()
              .mockImplementation((dto: CreateUserDto) =>
                Promise.resolve({ ...dto }),
              ),
            login: jest
              .fn()
              .mockImplementation((dto: CreateUserDto) =>
                Promise.resolve({ ...dto }),
              ),
            generateToken: jest
              .fn()
              .mockImplementation(() => Promise.resolve(accessToken)),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'username',
        password: 'password',
      };

      await expect(controller.createUser(createUserDto)).resolves.toEqual({
        ...createUserDto,
      });
    });

    it('should throw duplication error', async () => {
      const createUserDto: CreateUserDto = {
        username: 'username',
        password: 'password',
      };

      await expect(controller.createUser(createUserDto)).resolves.toEqual({
        ...createUserDto,
      });

      const spyOne = jest
        .spyOn(authService, 'register')
        .mockImplementation(() => {
          throw new CustomHttpException('Error');
        });
      await expect(controller.createUser(createUserDto)).rejects.toThrow(
        'Error',
      );
      expect(spyOne).toBeCalledWith(createUserDto);
    });

    it('should return access token', async () => {
      const createUserDto: CreateUserDto = {
        username: 'username',
        password: 'password',
      };

      await expect(controller.createUser(createUserDto)).resolves.toEqual({
        ...createUserDto,
      });

      const serviceResponse: IServiceResponse<JwtTokensResponse> = {
        result: { accessToken: accessToken },
      };

      const spyOne = jest
        .spyOn(authService, 'register')
        .mockResolvedValue(serviceResponse);

      expect(spyOne).toBeCalled();
      await expect(controller.createUser(createUserDto)).resolves.toEqual(
        serviceResponse,
      );
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const createUserDto: CreateUserDto = {
        username: 'username',
        password: 'password',
      };

      await expect(controller.login(createUserDto)).resolves.toEqual({
        ...createUserDto,
      });

      const serviceResponse: IServiceResponse<JwtTokensResponse> = {
        result: { accessToken: accessToken },
      };

      const spyOne = jest
        .spyOn(authService, 'login')
        .mockResolvedValue(serviceResponse);

      expect(spyOne).toBeCalled();
      await expect(controller.login(createUserDto)).resolves.toEqual(
        serviceResponse,
      );
    });
    it('should throw  error', async () => {
      const createUserDto: CreateUserDto = {
        username: 'username',
        password: 'password',
      };

      await expect(controller.login(createUserDto)).resolves.toEqual({
        ...createUserDto,
      });

      const spyOne = jest.spyOn(authService, 'login').mockImplementation(() => {
        throw new CustomHttpException('Error');
      });
      await expect(controller.login(createUserDto)).rejects.toThrow('Error');
      expect(spyOne).toBeCalledWith(createUserDto);
    });
  });
});
