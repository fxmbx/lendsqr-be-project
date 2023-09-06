export interface IAccount {
  account_id?: string;
  user_id?: string;
  balance: number;
  lien_balance: number;
  created_at?: Date;
}

export interface ITransaction {
  transaction_id?: string;
  account_id?: string;
  user_id?: string;
  amount: number;
  ref_number?: string;
  description?: string;
  transaction_type?: string;
  created_at?: string;
}
