import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrepsFileType } from 'app/shared/model/preps/preps-file-type.model';
import { PrepsFileTypeService } from './preps-file-type.service';

@Component({
  templateUrl: './preps-file-type-delete-dialog.component.html',
})
export class PrepsFileTypeDeleteDialogComponent {
  prepsFileType?: IPrepsFileType;

  constructor(
    protected prepsFileTypeService: PrepsFileTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prepsFileTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('prepsFileTypeListModification');
      this.activeModal.close();
    });
  }
}
