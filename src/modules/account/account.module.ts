import { Module } from '@nestjs/common';
import { AccountsService } from './services';
import { KnexModule } from 'nest-knexjs';
import { UserModule } from '../../modules/users/users.module';
import { AccountController } from './controllers';

@Module({
  imports: [KnexModule, UserModule],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountModule {}
