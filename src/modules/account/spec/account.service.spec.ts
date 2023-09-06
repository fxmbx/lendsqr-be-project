/* eslint-disable @typescript-eslint/no-var-requires */
import { AccountsService } from '../services';
import { IAccount } from '../interfaces/account.interface';

jest.mock('knex');

const accounts: IAccount[] = [
  {
    account_id: 'account1',
    user_id: 'user1',
    balance: 1,
    lien_balance: 0,
  },
];
describe('AccountsService', () => {
  let accountSerivce: AccountsService;
  const mockedKnex = require('knex');

  beforeEach(() => {
    accountSerivce = new AccountsService(mockedKnex);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccount', () => {
    it('should return user Account', async () => {
      const user_id = 'user1';

      mockedKnex.mockReturnValueOnce({
        where: jest.fn().mockResolvedValue(accounts),
      });

      const result = await accountSerivce.getAccount(user_id);

      expect(result).toEqual({
        result: accounts,
      });
    });

    it('should return empty array when account not found', async () => {
      const user_id = 'id that doesnt have account';

      mockedKnex.mockReturnValueOnce({
        where: jest.fn().mockResolvedValue([]),
      });

      const result = await accountSerivce.getAccount(user_id);
      expect(result.result).toHaveLength(0);
      expect(result).not.toEqual({
        result: accounts,
      });
    });
  });

  describe('createAccount', () => {
    it('should create new account', async () => {
      const user_id = 'user1';
      mockedKnex.mockReturnValueOnce({
        insert: jest.fn().mockImplementation(() => [1]),
      });

      const result = await accountSerivce.createAccount(user_id);
      expect(result.result).toEqual(1);
    });
  });
});
