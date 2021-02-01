import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../../test.module';
import { PrepsFileUploadUpdateComponent } from 'app/entities/preps/preps-file-upload/preps-file-upload-update.component';
import { PrepsFileUploadService } from 'app/entities/preps/preps-file-upload/preps-file-upload.service';
import { PrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';

describe('Component Tests', () => {
  describe('PrepsFileUpload Management Update Component', () => {
    let comp: PrepsFileUploadUpdateComponent;
    let fixture: ComponentFixture<PrepsFileUploadUpdateComponent>;
    let service: PrepsFileUploadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepsFileUploadUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PrepsFileUploadUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrepsFileUploadUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrepsFileUploadService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PrepsFileUpload(123);
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
        const entity = new PrepsFileUpload();
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
