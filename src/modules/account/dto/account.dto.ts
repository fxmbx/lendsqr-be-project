import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateAccountDto {
  userId: string;
}

export class FundAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  accountId: string;

  @IsOptional()
  userId?: string;

  @ApiProperty()
  @Min(10)
  amount: number;
}

export class TransferFundsDto {
  @ApiProperty()
  @IsNotEmpty()
  fromAccountId: string;

  @IsOptional()
  userId?: string;

  @ApiProperty()
  @IsNotEmpty()
  toAccountId: string;

  @ApiProperty()
  @Min(10)
  amount: number;
}

export class WithdrawFundsDto {
  @ApiProperty()
  @IsNotEmpty()
  fromAccountId: string;

  @IsOptional()
  userId?: string;

  @ApiProperty()
  @Min(10)
  amount: number;
}

export class GetTransactionsDto {
  @ApiProperty()
  @IsNotEmpty()
  accountId: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  userId?: string;
}
