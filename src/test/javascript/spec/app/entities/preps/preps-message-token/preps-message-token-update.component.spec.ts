import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrepaymentsDeveloperTestModule } from '../../../../test.module';
import { PrepsMessageTokenUpdateComponent } from 'app/entities/preps/preps-message-token/preps-message-token-update.component';
import { PrepsMessageTokenService } from 'app/entities/preps/preps-message-token/preps-message-token.service';
import { PrepsMessageToken } from 'app/shared/model/preps/preps-message-token.model';

describe('Component Tests', () => {
  describe('PrepsMessageToken Management Update Component', () => {
    let comp: PrepsMessageTokenUpdateComponent;
    let fixture: ComponentFixture<PrepsMessageTokenUpdateComponent>;
    let service: PrepsMessageTokenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepsMessageTokenUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PrepsMessageTokenUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrepsMessageTokenUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrepsMessageTokenService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PrepsMessageToken(123);
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
        const entity = new PrepsMessageToken();
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
