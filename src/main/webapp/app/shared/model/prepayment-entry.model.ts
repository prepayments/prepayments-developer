import { Moment } from 'moment';

export interface IPrepaymentEntry {
  id?: number;
  accountName?: string;
  description?: string;
  accountNumber?: string;
  prepaymentNumber?: string;
  prepaymentDate?: string;
  transactionAmount?: number;
  uploadToken?: string;
  prepaymentDataId?: number;
  compilationToken?: string;
}

export const defaultValue: Readonly<IPrepaymentEntry> = {};
