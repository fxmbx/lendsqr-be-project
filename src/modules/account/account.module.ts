import { Module } from '@nestjs/common';
import { AccountController } from './controllers';
import { AccountsService } from './services';
import { KnexModule } from 'nest-knexjs';
import { UserModule } from '../../modules/users/users.module';

@Module({
  imports: [KnexModule, UserModule],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountModule {}
