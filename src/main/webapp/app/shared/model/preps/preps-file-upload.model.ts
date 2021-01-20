import { Moment } from 'moment';

export interface IPrepsFileUpload {
  id?: number;
  description?: string;
  fileName?: string;
  periodFrom?: string;
  periodTo?: string;
  prepsFileTypeId?: number;
  dataFileContentType?: string;
  dataFile?: any;
  uploadSuccessful?: boolean;
  uploadProcessed?: boolean;
  uploadToken?: string;
}

export const defaultValue: Readonly<IPrepsFileUpload> = {
  uploadSuccessful: false,
  uploadProcessed: false,
};
