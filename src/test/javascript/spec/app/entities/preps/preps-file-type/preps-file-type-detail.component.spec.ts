import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { PrepaymentsDeveloperTestModule } from '../../../../test.module';
import { PrepsFileTypeDetailComponent } from 'app/entities/preps/preps-file-type/preps-file-type-detail.component';
import { PrepsFileType } from 'app/shared/model/preps/preps-file-type.model';

describe('Component Tests', () => {
  describe('PrepsFileType Management Detail Component', () => {
    let comp: PrepsFileTypeDetailComponent;
    let fixture: ComponentFixture<PrepsFileTypeDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ prepsFileType: new PrepsFileType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepsFileTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PrepsFileTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrepsFileTypeDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load prepsFileType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.prepsFileType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
