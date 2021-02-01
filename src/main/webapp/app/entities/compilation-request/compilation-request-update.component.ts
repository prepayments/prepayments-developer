import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICompilationRequest, CompilationRequest } from 'app/shared/model/compilation-request.model';
import { CompilationRequestService } from './compilation-request.service';

@Component({
  selector: 'gha-compilation-request-update',
  templateUrl: './compilation-request-update.component.html',
})
export class CompilationRequestUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [],
    fileUploadId: [],
    compilationStatus: [],
    compilationType: [],
    compilationToken: [],
  });

  constructor(
    protected compilationRequestService: CompilationRequestService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compilationRequest }) => {
      this.updateForm(compilationRequest);
    });
  }

  updateForm(compilationRequest: ICompilationRequest): void {
    this.editForm.patchValue({
      id: compilationRequest.id,
      description: compilationRequest.description,
      fileUploadId: compilationRequest.fileUploadId,
      compilationStatus: compilationRequest.compilationStatus,
      compilationType: compilationRequest.compilationType,
      compilationToken: compilationRequest.compilationToken,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const compilationRequest = this.createFromForm();
    if (compilationRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.compilationRequestService.update(compilationRequest));
    } else {
      this.subscribeToSaveResponse(this.compilationRequestService.create(compilationRequest));
    }
  }

  private createFromForm(): ICompilationRequest {
    return {
      ...new CompilationRequest(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      fileUploadId: this.editForm.get(['fileUploadId'])!.value,
      compilationStatus: this.editForm.get(['compilationStatus'])!.value,
      compilationType: this.editForm.get(['compilationType'])!.value,
      compilationToken: this.editForm.get(['compilationToken'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompilationRequest>>): void {
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
