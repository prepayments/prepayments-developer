import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompilationRequest } from 'app/shared/model/compilation-request.model';
import { CompilationRequestService } from './compilation-request.service';

@Component({
  templateUrl: './compilation-request-delete-dialog.component.html',
})
export class CompilationRequestDeleteDialogComponent {
  compilationRequest?: ICompilationRequest;

  constructor(
    protected compilationRequestService: CompilationRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.compilationRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast('compilationRequestListModification');
      this.activeModal.close();
    });
  }
}
