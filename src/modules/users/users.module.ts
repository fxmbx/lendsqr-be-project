import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { AuthService } from './services/auth.service';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [KnexModule],
  controllers: [UsersController],
  providers: [AuthService],
  exports: [AuthService],
})
export class UserModule {}
