import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../../test.module';
import { PrepsFileTypeUpdateComponent } from 'app/entities/preps/preps-file-type/preps-file-type-update.component';
import { PrepsFileTypeService } from 'app/entities/preps/preps-file-type/preps-file-type.service';
import { PrepsFileType } from 'app/shared/model/preps/preps-file-type.model';

describe('Component Tests', () => {
  describe('PrepsFileType Management Update Component', () => {
    let comp: PrepsFileTypeUpdateComponent;
    let fixture: ComponentFixture<PrepsFileTypeUpdateComponent>;
    let service: PrepsFileTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepsFileTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PrepsFileTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrepsFileTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrepsFileTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PrepsFileType(123);
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
        const entity = new PrepsFileType();
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
