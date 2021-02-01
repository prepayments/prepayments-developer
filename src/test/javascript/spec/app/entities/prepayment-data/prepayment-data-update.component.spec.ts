import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../test.module';
import { PrepaymentDataUpdateComponent } from 'app/entities/prepayment-data/prepayment-data-update.component';
import { PrepaymentDataService } from 'app/entities/prepayment-data/prepayment-data.service';
import { PrepaymentData } from 'app/shared/model/prepayment-data.model';

describe('Component Tests', () => {
  describe('PrepaymentData Management Update Component', () => {
    let comp: PrepaymentDataUpdateComponent;
    let fixture: ComponentFixture<PrepaymentDataUpdateComponent>;
    let service: PrepaymentDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepaymentDataUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PrepaymentDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrepaymentDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrepaymentDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PrepaymentData(123);
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
        const entity = new PrepaymentData();
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
