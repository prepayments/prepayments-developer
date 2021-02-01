import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAmortizationEntry, AmortizationEntry } from 'app/shared/model/amortization-entry.model';
import { AmortizationEntryService } from './amortization-entry.service';

@Component({
  selector: 'gha-amortization-entry-update',
  templateUrl: './amortization-entry-update.component.html',
})
export class AmortizationEntryUpdateComponent implements OnInit {
  isSaving = false;
  prepaymentDateDp: any;
  amortizationDateDp: any;

  editForm = this.fb.group({
    id: [],
    accountName: [],
    description: [],
    accountNumber: [],
    expenseAccountNumber: [],
    prepaymentNumber: [],
    prepaymentDate: [],
    transactionAmount: [],
    amortizationDate: [],
    uploadToken: [],
    prepaymentDataId: [],
    compilationToken: [],
  });

  constructor(
    protected amortizationEntryService: AmortizationEntryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ amortizationEntry }) => {
      this.updateForm(amortizationEntry);
    });
  }

  updateForm(amortizationEntry: IAmortizationEntry): void {
    this.editForm.patchValue({
      id: amortizationEntry.id,
      accountName: amortizationEntry.accountName,
      description: amortizationEntry.description,
      accountNumber: amortizationEntry.accountNumber,
      expenseAccountNumber: amortizationEntry.expenseAccountNumber,
      prepaymentNumber: amortizationEntry.prepaymentNumber,
      prepaymentDate: amortizationEntry.prepaymentDate,
      transactionAmount: amortizationEntry.transactionAmount,
      amortizationDate: amortizationEntry.amortizationDate,
      uploadToken: amortizationEntry.uploadToken,
      prepaymentDataId: amortizationEntry.prepaymentDataId,
      compilationToken: amortizationEntry.compilationToken,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const amortizationEntry = this.createFromForm();
    if (amortizationEntry.id !== undefined) {
      this.subscribeToSaveResponse(this.amortizationEntryService.update(amortizationEntry));
    } else {
      this.subscribeToSaveResponse(this.amortizationEntryService.create(amortizationEntry));
    }
  }

  private createFromForm(): IAmortizationEntry {
    return {
      ...new AmortizationEntry(),
      id: this.editForm.get(['id'])!.value,
      accountName: this.editForm.get(['accountName'])!.value,
      description: this.editForm.get(['description'])!.value,
      accountNumber: this.editForm.get(['accountNumber'])!.value,
      expenseAccountNumber: this.editForm.get(['expenseAccountNumber'])!.value,
      prepaymentNumber: this.editForm.get(['prepaymentNumber'])!.value,
      prepaymentDate: this.editForm.get(['prepaymentDate'])!.value,
      transactionAmount: this.editForm.get(['transactionAmount'])!.value,
      amortizationDate: this.editForm.get(['amortizationDate'])!.value,
      uploadToken: this.editForm.get(['uploadToken'])!.value,
      prepaymentDataId: this.editForm.get(['prepaymentDataId'])!.value,
      compilationToken: this.editForm.get(['compilationToken'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAmortizationEntry>>): void {
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
