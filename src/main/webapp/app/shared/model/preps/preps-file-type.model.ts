import { PrepsFileMediumTypes } from 'app/shared/model/enumerations/preps-file-medium-types.model';
import { PrepsFileModelType } from 'app/shared/model/enumerations/preps-file-model-type.model';
import { PrepsFileDeleteProcessType } from 'app/shared/model/enumerations/preps-file-delete-process-type.model';

export interface IPrepsFileType {
  id?: number;
  prepsFileTypeName?: string;
  prepsFileMediumType?: PrepsFileMediumTypes;
  description?: string;
  fileTemplateContentType?: string;
  fileTemplate?: any;
  prepsfileType?: PrepsFileModelType;
  prepsfileDeleteProcessType?: PrepsFileDeleteProcessType;
}

export const defaultValue: Readonly<IPrepsFileType> = {};
