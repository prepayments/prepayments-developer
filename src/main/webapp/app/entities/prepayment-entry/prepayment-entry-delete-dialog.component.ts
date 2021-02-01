import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrepaymentEntry } from 'app/shared/model/prepayment-entry.model';
import { PrepaymentEntryService } from './prepayment-entry.service';

@Component({
  templateUrl: './prepayment-entry-delete-dialog.component.html',
})
export class PrepaymentEntryDeleteDialogComponent {
  prepaymentEntry?: IPrepaymentEntry;

  constructor(
    protected prepaymentEntryService: PrepaymentEntryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prepaymentEntryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('prepaymentEntryListModification');
      this.activeModal.close();
    });
  }
}
