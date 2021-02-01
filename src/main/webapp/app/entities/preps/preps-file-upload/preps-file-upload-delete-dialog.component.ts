import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';
import { PrepsFileUploadService } from './preps-file-upload.service';

@Component({
  templateUrl: './preps-file-upload-delete-dialog.component.html',
})
export class PrepsFileUploadDeleteDialogComponent {
  prepsFileUpload?: IPrepsFileUpload;

  constructor(
    protected prepsFileUploadService: PrepsFileUploadService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prepsFileUploadService.delete(id).subscribe(() => {
      this.eventManager.broadcast('prepsFileUploadListModification');
      this.activeModal.close();
    });
  }
}
