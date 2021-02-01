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

export class PrepsFileType implements IPrepsFileType {
  constructor(
    public id?: number,
    public prepsFileTypeName?: string,
    public prepsFileMediumType?: PrepsFileMediumTypes,
    public description?: string,
    public fileTemplateContentType?: string,
    public fileTemplate?: any,
    public prepsfileType?: PrepsFileModelType,
    public prepsfileDeleteProcessType?: PrepsFileDeleteProcessType
  ) {}
}
