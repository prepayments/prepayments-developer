import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrepsMessageToken } from 'app/shared/model/preps/preps-message-token.model';
import { PrepsMessageTokenService } from './preps-message-token.service';

@Component({
  templateUrl: './preps-message-token-delete-dialog.component.html',
})
export class PrepsMessageTokenDeleteDialogComponent {
  prepsMessageToken?: IPrepsMessageToken;

  constructor(
    protected prepsMessageTokenService: PrepsMessageTokenService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prepsMessageTokenService.delete(id).subscribe(() => {
      this.eventManager.broadcast('prepsMessageTokenListModification');
      this.activeModal.close();
    });
  }
}
