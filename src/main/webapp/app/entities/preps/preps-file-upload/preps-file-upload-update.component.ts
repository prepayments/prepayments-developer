import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPrepsFileUpload, PrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';
import { PrepsFileUploadService } from './preps-file-upload.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'gha-preps-file-upload-update',
  templateUrl: './preps-file-upload-update.component.html',
})
export class PrepsFileUploadUpdateComponent implements OnInit {
  isSaving = false;
  periodFromDp: any;
  periodToDp: any;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    fileName: [null, [Validators.required]],
    periodFrom: [],
    periodTo: [],
    prepsFileTypeId: [null, [Validators.required]],
    dataFile: [null, [Validators.required]],
    dataFileContentType: [],
    uploadSuccessful: [],
    uploadProcessed: [],
    uploadToken: [null, []],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected prepsFileUploadService: PrepsFileUploadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepsFileUpload }) => {
      this.updateForm(prepsFileUpload);
    });
  }

  updateForm(prepsFileUpload: IPrepsFileUpload): void {
    this.editForm.patchValue({
      id: prepsFileUpload.id,
      description: prepsFileUpload.description,
      fileName: prepsFileUpload.fileName,
      periodFrom: prepsFileUpload.periodFrom,
      periodTo: prepsFileUpload.periodTo,
      prepsFileTypeId: prepsFileUpload.prepsFileTypeId,
      dataFile: prepsFileUpload.dataFile,
      dataFileContentType: prepsFileUpload.dataFileContentType,
      uploadSuccessful: prepsFileUpload.uploadSuccessful,
      uploadProcessed: prepsFileUpload.uploadProcessed,
      uploadToken: prepsFileUpload.uploadToken,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('prepaymentsDeveloperApp.error', { message: err.message })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepsFileUpload = this.createFromForm();
    if (prepsFileUpload.id !== undefined) {
      this.subscribeToSaveResponse(this.prepsFileUploadService.update(prepsFileUpload));
    } else {
      this.subscribeToSaveResponse(this.prepsFileUploadService.create(prepsFileUpload));
    }
  }

  private createFromForm(): IPrepsFileUpload {
    return {
      ...new PrepsFileUpload(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      fileName: this.editForm.get(['fileName'])!.value,
      periodFrom: this.editForm.get(['periodFrom'])!.value,
      periodTo: this.editForm.get(['periodTo'])!.value,
      prepsFileTypeId: this.editForm.get(['prepsFileTypeId'])!.value,
      dataFileContentType: this.editForm.get(['dataFileContentType'])!.value,
      dataFile: this.editForm.get(['dataFile'])!.value,
      uploadSuccessful: this.editForm.get(['uploadSuccessful'])!.value,
      uploadProcessed: this.editForm.get(['uploadProcessed'])!.value,
      uploadToken: this.editForm.get(['uploadToken'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepsFileUpload>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
