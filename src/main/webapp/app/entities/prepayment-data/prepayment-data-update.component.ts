import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrepaymentData, PrepaymentData } from 'app/shared/model/prepayment-data.model';
import { PrepaymentDataService } from './prepayment-data.service';

@Component({
  selector: 'gha-prepayment-data-update',
  templateUrl: './prepayment-data-update.component.html',
})
export class PrepaymentDataUpdateComponent implements OnInit {
  isSaving = false;
  prepaymentDateDp: any;

  editForm = this.fb.group({
    id: [],
    accountName: [],
    description: [],
    accountNumber: [],
    expenseAccountNumber: [],
    prepaymentNumber: [],
    prepaymentDate: [],
    prepaymentAmount: [],
    prepaymentPeriods: [],
    uploadToken: [],
  });

  constructor(protected prepaymentDataService: PrepaymentDataService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentData }) => {
      this.updateForm(prepaymentData);
    });
  }

  updateForm(prepaymentData: IPrepaymentData): void {
    this.editForm.patchValue({
      id: prepaymentData.id,
      accountName: prepaymentData.accountName,
      description: prepaymentData.description,
      accountNumber: prepaymentData.accountNumber,
      expenseAccountNumber: prepaymentData.expenseAccountNumber,
      prepaymentNumber: prepaymentData.prepaymentNumber,
      prepaymentDate: prepaymentData.prepaymentDate,
      prepaymentAmount: prepaymentData.prepaymentAmount,
      prepaymentPeriods: prepaymentData.prepaymentPeriods,
      uploadToken: prepaymentData.uploadToken,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepaymentData = this.createFromForm();
    if (prepaymentData.id !== undefined) {
      this.subscribeToSaveResponse(this.prepaymentDataService.update(prepaymentData));
    } else {
      this.subscribeToSaveResponse(this.prepaymentDataService.create(prepaymentData));
    }
  }

  private createFromForm(): IPrepaymentData {
    return {
      ...new PrepaymentData(),
      id: this.editForm.get(['id'])!.value,
      accountName: this.editForm.get(['accountName'])!.value,
      description: this.editForm.get(['description'])!.value,
      accountNumber: this.editForm.get(['accountNumber'])!.value,
      expenseAccountNumber: this.editForm.get(['expenseAccountNumber'])!.value,
      prepaymentNumber: this.editForm.get(['prepaymentNumber'])!.value,
      prepaymentDate: this.editForm.get(['prepaymentDate'])!.value,
      prepaymentAmount: this.editForm.get(['prepaymentAmount'])!.value,
      prepaymentPeriods: this.editForm.get(['prepaymentPeriods'])!.value,
      uploadToken: this.editForm.get(['uploadToken'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepaymentData>>): void {
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
