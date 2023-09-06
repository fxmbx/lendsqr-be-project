export interface IAccount {
  account_id?: string;
  user_id?: string;
  balance: number;
  lien_balance: number;
  created_at?: Date;
}
