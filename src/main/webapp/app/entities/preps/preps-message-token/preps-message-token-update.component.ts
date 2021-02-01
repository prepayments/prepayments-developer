import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrepsMessageToken, PrepsMessageToken } from 'app/shared/model/preps/preps-message-token.model';
import { PrepsMessageTokenService } from './preps-message-token.service';

@Component({
  selector: 'gha-preps-message-token-update',
  templateUrl: './preps-message-token-update.component.html',
})
export class PrepsMessageTokenUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [],
    timeSent: [null, [Validators.required]],
    tokenValue: [null, [Validators.required]],
    received: [],
    actioned: [],
    contentFullyEnqueued: [],
  });

  constructor(
    protected prepsMessageTokenService: PrepsMessageTokenService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepsMessageToken }) => {
      this.updateForm(prepsMessageToken);
    });
  }

  updateForm(prepsMessageToken: IPrepsMessageToken): void {
    this.editForm.patchValue({
      id: prepsMessageToken.id,
      description: prepsMessageToken.description,
      timeSent: prepsMessageToken.timeSent,
      tokenValue: prepsMessageToken.tokenValue,
      received: prepsMessageToken.received,
      actioned: prepsMessageToken.actioned,
      contentFullyEnqueued: prepsMessageToken.contentFullyEnqueued,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepsMessageToken = this.createFromForm();
    if (prepsMessageToken.id !== undefined) {
      this.subscribeToSaveResponse(this.prepsMessageTokenService.update(prepsMessageToken));
    } else {
      this.subscribeToSaveResponse(this.prepsMessageTokenService.create(prepsMessageToken));
    }
  }

  private createFromForm(): IPrepsMessageToken {
    return {
      ...new PrepsMessageToken(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      timeSent: this.editForm.get(['timeSent'])!.value,
      tokenValue: this.editForm.get(['tokenValue'])!.value,
      received: this.editForm.get(['received'])!.value,
      actioned: this.editForm.get(['actioned'])!.value,
      contentFullyEnqueued: this.editForm.get(['contentFullyEnqueued'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepsMessageToken>>): void {
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
