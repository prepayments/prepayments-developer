import { Moment } from 'moment';

export interface IPrepaymentData {
  id?: number;
  accountName?: string;
  description?: string;
  accountNumber?: string;
  expenseAccountNumber?: string;
  prepaymentNumber?: string;
  prepaymentDate?: string;
  prepaymentAmount?: number;
  prepaymentPeriods?: number;
  uploadToken?: string;
}

export const defaultValue: Readonly<IPrepaymentData> = {};
