import { Moment } from 'moment';

export interface IPrepaymentData {
  id?: number;
  accountName?: string;
  description?: string;
  accountNumber?: string;
  expenseAccountNumber?: string;
  prepaymentNumber?: string;
  prepaymentDate?: Moment;
  prepaymentAmount?: number;
  prepaymentPeriods?: number;
  uploadToken?: string;
}

export class PrepaymentData implements IPrepaymentData {
  constructor(
    public id?: number,
    public accountName?: string,
    public description?: string,
    public accountNumber?: string,
    public expenseAccountNumber?: string,
    public prepaymentNumber?: string,
    public prepaymentDate?: Moment,
    public prepaymentAmount?: number,
    public prepaymentPeriods?: number,
    public uploadToken?: string
  ) {}
}
