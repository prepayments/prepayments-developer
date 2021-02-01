import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrepaymentEntry, PrepaymentEntry } from 'app/shared/model/prepayment-entry.model';
import { PrepaymentEntryService } from './prepayment-entry.service';

@Component({
  selector: 'gha-prepayment-entry-update',
  templateUrl: './prepayment-entry-update.component.html',
})
export class PrepaymentEntryUpdateComponent implements OnInit {
  isSaving = false;
  prepaymentDateDp: any;

  editForm = this.fb.group({
    id: [],
    accountName: [],
    description: [],
    accountNumber: [],
    prepaymentNumber: [],
    prepaymentDate: [],
    transactionAmount: [],
    uploadToken: [],
    prepaymentDataId: [],
    compilationToken: [],
  });

  constructor(
    protected prepaymentEntryService: PrepaymentEntryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentEntry }) => {
      this.updateForm(prepaymentEntry);
    });
  }

  updateForm(prepaymentEntry: IPrepaymentEntry): void {
    this.editForm.patchValue({
      id: prepaymentEntry.id,
      accountName: prepaymentEntry.accountName,
      description: prepaymentEntry.description,
      accountNumber: prepaymentEntry.accountNumber,
      prepaymentNumber: prepaymentEntry.prepaymentNumber,
      prepaymentDate: prepaymentEntry.prepaymentDate,
      transactionAmount: prepaymentEntry.transactionAmount,
      uploadToken: prepaymentEntry.uploadToken,
      prepaymentDataId: prepaymentEntry.prepaymentDataId,
      compilationToken: prepaymentEntry.compilationToken,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepaymentEntry = this.createFromForm();
    if (prepaymentEntry.id !== undefined) {
      this.subscribeToSaveResponse(this.prepaymentEntryService.update(prepaymentEntry));
    } else {
      this.subscribeToSaveResponse(this.prepaymentEntryService.create(prepaymentEntry));
    }
  }

  private createFromForm(): IPrepaymentEntry {
    return {
      ...new PrepaymentEntry(),
      id: this.editForm.get(['id'])!.value,
      accountName: this.editForm.get(['accountName'])!.value,
      description: this.editForm.get(['description'])!.value,
      accountNumber: this.editForm.get(['accountNumber'])!.value,
      prepaymentNumber: this.editForm.get(['prepaymentNumber'])!.value,
      prepaymentDate: this.editForm.get(['prepaymentDate'])!.value,
      transactionAmount: this.editForm.get(['transactionAmount'])!.value,
      uploadToken: this.editForm.get(['uploadToken'])!.value,
      prepaymentDataId: this.editForm.get(['prepaymentDataId'])!.value,
      compilationToken: this.editForm.get(['compilationToken'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepaymentEntry>>): void {
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
