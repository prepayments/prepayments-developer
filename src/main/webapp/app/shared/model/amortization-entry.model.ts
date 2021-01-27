import { Moment } from 'moment';

export interface IAmortizationEntry {
  id?: number;
  accountName?: string;
  description?: string;
  accountNumber?: string;
  expenseAccountNumber?: string;
  prepaymentNumber?: string;
  prepaymentDate?: string;
  transactionAmount?: number;
  amortizationDate?: string;
  uploadToken?: string;
  prepaymentDataId?: number;
  compilationToken?: string;
}

export const defaultValue: Readonly<IAmortizationEntry> = {};
