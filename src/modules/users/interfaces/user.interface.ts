import { IAccount } from '@modules/account/interfaces/account.interface';

export interface IUser {
  id?: string;
  username?: string;
  password?: string;
  created_at?: Date;
  account?: IAccount[];
}

export default interface IUserPayload {
  readonly user_id: string;
}
