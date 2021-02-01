import { CompilationStatus } from 'app/shared/model/enumerations/compilation-status.model';
import { CompilationType } from 'app/shared/model/enumerations/compilation-type.model';

export interface ICompilationRequest {
  id?: number;
  description?: string;
  fileUploadId?: number;
  compilationStatus?: CompilationStatus;
  compilationType?: CompilationType;
  compilationToken?: string;
}

export class CompilationRequest implements ICompilationRequest {
  constructor(
    public id?: number,
    public description?: string,
    public fileUploadId?: number,
    public compilationStatus?: CompilationStatus,
    public compilationType?: CompilationType,
    public compilationToken?: string
  ) {}
}
