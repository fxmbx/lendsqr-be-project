import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'nestjs-knex';
import {
  FundAccountDto,
  GetTransactionsDto,
  TransferFundsDto,
  WithdrawFundsDto,
} from '../dto/account.dto';
import { IServiceResponse } from '@common/service.response';
import { IAccount } from '../interfaces/account.interface';
import { CustomHttpException } from '../../../common/custom-http.exception';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountsService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getAccount(user_id: string): Promise<IServiceResponse<IAccount[]>> {
    const userAcct = await this.knex('accounts').where('user_id', user_id);

    return { result: userAcct };
  }

  async createAccount(user_id: string): Promise<IServiceResponse<number>> {
    const userAcct = await this.knex('accounts').insert({
      user_id: user_id,
      balance: 0,
      lien_balance: 0,
    });

    return { result: userAcct[0] };
  }

  async fundAccount(dto: FundAccountDto): Promise<IServiceResponse<number>> {
    const refNo = uuidv4();
    const res = await this.knex.transaction(async (trx) => {
      const res = await trx('accounts')
        .where('account_id', dto.accountId)
        .andWhere('user_id', dto.userId)
        .increment('balance', dto.amount);

      await trx('transactions').insert({
        account_id: dto.accountId,
        user_id: dto.userId,
        amount: dto.amount,
        ref_number: refNo,
        transaction_type: 'CREDIT',
        description: `Funding Wallet(${dto.accountId}) with :: ${dto.amount}`,
      });
      return { result: res };
    });

    return res;
  }

  async transferFunds(
    dto: TransferFundsDto,
  ): Promise<IServiceResponse<number>> {
    const refNo = uuidv4();
    const res = await this.knex.transaction(async (trx) => {
      const fromAccount = await trx('accounts')
        .where('account_id', dto.fromAccountId)
        .andWhere('user_id', dto.userId)
        .andWhere('balance', '>=', dto.amount)
        .decrement('balance', dto.amount);

      if (!fromAccount) {
        throw new CustomHttpException(
          'Sender account cannot perform transaction',
          400,
        );
      }

      const toAccount: IAccount = await trx('accounts')
        .where('account_id', dto.toAccountId)
        .increment('balance', dto.amount)
        .select('*');

      if (!toAccount) {
        throw new CustomHttpException('Reciever account not found', 404);
      }

      await trx('transactions').insert({
        account_id: dto.fromAccountId,
        user_id: dto.userId,
        amount: dto.amount,
        ref_number: refNo,
        transaction_type: 'DEBIT',
        description: `Transfer from ${dto.fromAccountId} to ${dto.toAccountId}`,
      });

      await trx('transactions').insert({
        account_id: dto.toAccountId,
        user_id: dto.userId,
        amount: dto.amount,
        ref_number: refNo,
        transaction_type: 'CREDIT',
        description: `Transfer from ${dto.fromAccountId} to ${dto.toAccountId}`,
      });

      return fromAccount;
    });
    return {
      result: res,
    };
  }

  async withdrawFunds(
    dto: WithdrawFundsDto,
  ): Promise<IServiceResponse<number>> {
    const refNo = uuidv4();

    return await this.knex.transaction(async (trx) => {
      const account = await trx('accounts')
        .where('account_id', dto.fromAccountId)
        .andWhere('balance', '>=', dto.amount)
        .decrement('balance', dto.amount);

      if (!account) {
        throw new CustomHttpException('Account Cant Perform Transaction', 400);
      }

      await trx('transactions').insert({
        account_id: dto.fromAccountId,
        user_id: dto.userId,
        amount: dto.amount,
        ref_number: refNo,
        transaction_type: 'DEBIT',
        description: `Withdrawal of  ${dto.amount} from Account :: ${dto.fromAccountId}`,
      });

      return { result: account };
    });
  }

  async getTrasnactions(
    dto: GetTransactionsDto,
  ): Promise<IServiceResponse<any>> {
    const userAcct = await this.knex('transactions')
      .where('user_id', dto.userId)
      .andWhere('account_id', dto.accountId);
    return { result: userAcct };
  }
}
