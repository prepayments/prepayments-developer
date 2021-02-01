import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../test.module';
import { CompilationRequestUpdateComponent } from 'app/entities/compilation-request/compilation-request-update.component';
import { CompilationRequestService } from 'app/entities/compilation-request/compilation-request.service';
import { CompilationRequest } from 'app/shared/model/compilation-request.model';

describe('Component Tests', () => {
  describe('CompilationRequest Management Update Component', () => {
    let comp: CompilationRequestUpdateComponent;
    let fixture: ComponentFixture<CompilationRequestUpdateComponent>;
    let service: CompilationRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [CompilationRequestUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CompilationRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CompilationRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CompilationRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CompilationRequest(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CompilationRequest();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
