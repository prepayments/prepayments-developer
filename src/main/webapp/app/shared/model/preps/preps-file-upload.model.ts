import { Moment } from 'moment';

export interface IPrepsFileUpload {
  id?: number;
  description?: string;
  fileName?: string;
  periodFrom?: Moment;
  periodTo?: Moment;
  prepsFileTypeId?: number;
  dataFileContentType?: string;
  dataFile?: any;
  uploadSuccessful?: boolean;
  uploadProcessed?: boolean;
  uploadToken?: string;
}

export class PrepsFileUpload implements IPrepsFileUpload {
  constructor(
    public id?: number,
    public description?: string,
    public fileName?: string,
    public periodFrom?: Moment,
    public periodTo?: Moment,
    public prepsFileTypeId?: number,
    public dataFileContentType?: string,
    public dataFile?: any,
    public uploadSuccessful?: boolean,
    public uploadProcessed?: boolean,
    public uploadToken?: string
  ) {
    this.uploadSuccessful = this.uploadSuccessful || false;
    this.uploadProcessed = this.uploadProcessed || false;
  }
}
