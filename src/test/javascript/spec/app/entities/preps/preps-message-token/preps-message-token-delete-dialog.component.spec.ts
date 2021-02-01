import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrepaymentsDeveloperTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { PrepsMessageTokenDeleteDialogComponent } from 'app/entities/preps/preps-message-token/preps-message-token-delete-dialog.component';
import { PrepsMessageTokenService } from 'app/entities/preps/preps-message-token/preps-message-token.service';

describe('Component Tests', () => {
  describe('PrepsMessageToken Management Delete Component', () => {
    let comp: PrepsMessageTokenDeleteDialogComponent;
    let fixture: ComponentFixture<PrepsMessageTokenDeleteDialogComponent>;
    let service: PrepsMessageTokenService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepsMessageTokenDeleteDialogComponent],
      })
        .overrideTemplate(PrepsMessageTokenDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrepsMessageTokenDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrepsMessageTokenService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
