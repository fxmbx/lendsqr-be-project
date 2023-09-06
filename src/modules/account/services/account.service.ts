import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'nestjs-knex';
import { FundAccountDto } from '../dto/account.dto';
import { IServiceResponse } from '@common/service.response';
import { IAccount } from '../interfaces/account.interface';
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
}
