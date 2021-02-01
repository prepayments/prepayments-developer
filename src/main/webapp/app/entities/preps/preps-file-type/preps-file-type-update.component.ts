import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPrepsFileType, PrepsFileType } from 'app/shared/model/preps/preps-file-type.model';
import { PrepsFileTypeService } from './preps-file-type.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'gha-preps-file-type-update',
  templateUrl: './preps-file-type-update.component.html',
})
export class PrepsFileTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    prepsFileTypeName: [null, [Validators.required]],
    prepsFileMediumType: [null, [Validators.required]],
    description: [],
    fileTemplate: [],
    fileTemplateContentType: [],
    prepsfileType: [],
    prepsfileDeleteProcessType: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected prepsFileTypeService: PrepsFileTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepsFileType }) => {
      this.updateForm(prepsFileType);
    });
  }

  updateForm(prepsFileType: IPrepsFileType): void {
    this.editForm.patchValue({
      id: prepsFileType.id,
      prepsFileTypeName: prepsFileType.prepsFileTypeName,
      prepsFileMediumType: prepsFileType.prepsFileMediumType,
      description: prepsFileType.description,
      fileTemplate: prepsFileType.fileTemplate,
      fileTemplateContentType: prepsFileType.fileTemplateContentType,
      prepsfileType: prepsFileType.prepsfileType,
      prepsfileDeleteProcessType: prepsFileType.prepsfileDeleteProcessType,
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
    const prepsFileType = this.createFromForm();
    if (prepsFileType.id !== undefined) {
      this.subscribeToSaveResponse(this.prepsFileTypeService.update(prepsFileType));
    } else {
      this.subscribeToSaveResponse(this.prepsFileTypeService.create(prepsFileType));
    }
  }

  private createFromForm(): IPrepsFileType {
    return {
      ...new PrepsFileType(),
      id: this.editForm.get(['id'])!.value,
      prepsFileTypeName: this.editForm.get(['prepsFileTypeName'])!.value,
      prepsFileMediumType: this.editForm.get(['prepsFileMediumType'])!.value,
      description: this.editForm.get(['description'])!.value,
      fileTemplateContentType: this.editForm.get(['fileTemplateContentType'])!.value,
      fileTemplate: this.editForm.get(['fileTemplate'])!.value,
      prepsfileType: this.editForm.get(['prepsfileType'])!.value,
      prepsfileDeleteProcessType: this.editForm.get(['prepsfileDeleteProcessType'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepsFileType>>): void {
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
