import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAmortizationEntry } from 'app/shared/model/amortization-entry.model';
import { AmortizationEntryService } from './amortization-entry.service';

@Component({
  templateUrl: './amortization-entry-delete-dialog.component.html',
})
export class AmortizationEntryDeleteDialogComponent {
  amortizationEntry?: IAmortizationEntry;

  constructor(
    protected amortizationEntryService: AmortizationEntryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.amortizationEntryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('amortizationEntryListModification');
      this.activeModal.close();
    });
  }
}
