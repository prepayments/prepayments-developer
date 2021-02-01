import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrepaymentData } from 'app/shared/model/prepayment-data.model';
import { PrepaymentDataService } from './prepayment-data.service';

@Component({
  templateUrl: './prepayment-data-delete-dialog.component.html',
})
export class PrepaymentDataDeleteDialogComponent {
  prepaymentData?: IPrepaymentData;

  constructor(
    protected prepaymentDataService: PrepaymentDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prepaymentDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('prepaymentDataListModification');
      this.activeModal.close();
    });
  }
}
