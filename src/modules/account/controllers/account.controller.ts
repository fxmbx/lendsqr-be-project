import { Body, Controller, Post, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guards';
import { AccountsService } from '../services/account.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  FundAccountDto,
  GetTransactionsDto,
  TransferFundsDto,
  WithdrawFundsDto,
} from '../dto/account.dto';
import { IServiceResponse } from '@common/service.response';
import RequestUser from '../../../decorators/request-user.decorator';
import IUserPayload from '../../users/interfaces/user.interface';

@ApiBearerAuth()
@Controller({ path: 'account', version: '1' })
@ApiTags('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountsService) {}

  @Post('fund')
  async findAccount(
    @RequestUser() user: IUserPayload,
    @Body() dto: FundAccountDto,
  ): Promise<IServiceResponse<unknown>> {
    dto.userId = user.user_id;
    return this.accountService.fundAccount(dto);
  }

  @Post('withdraw')
  async withdrawFunds(
    @RequestUser() user: IUserPayload,
    @Body() dto: WithdrawFundsDto,
  ): Promise<IServiceResponse<unknown>> {
    dto.userId = user.user_id;
    return this.accountService.withdrawFunds(dto);
  }

  @Post('transfer')
  async transferFunds(
    @RequestUser() user: IUserPayload,
    @Body() dto: TransferFundsDto,
  ): Promise<IServiceResponse<unknown>> {
    dto.userId = user.user_id;
    return this.accountService.transferFunds(dto);
  }

  @Post('create')
  async createAccount(
    @RequestUser() user: IUserPayload,
  ): Promise<IServiceResponse<unknown>> {
    return this.accountService.createAccount(user.user_id);
  }

  @Get()
  async getAccount(
    @RequestUser() user: IUserPayload,
  ): Promise<IServiceResponse<unknown>> {
    return this.accountService.getAccount(user.user_id);
  }

  @Get('transactions')
  async getAccountTransactions(
    @RequestUser() user: IUserPayload,
    @Query() dto: GetTransactionsDto,
  ): Promise<IServiceResponse<unknown>> {
    dto.userId = user.user_id;
    return this.accountService.getTrasnactions(dto);
  }
}
