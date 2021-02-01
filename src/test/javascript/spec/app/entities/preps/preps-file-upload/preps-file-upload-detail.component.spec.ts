import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { PrepaymentsDeveloperTestModule } from '../../../../test.module';
import { PrepsFileUploadDetailComponent } from 'app/entities/preps/preps-file-upload/preps-file-upload-detail.component';
import { PrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';

describe('Component Tests', () => {
  describe('PrepsFileUpload Management Detail Component', () => {
    let comp: PrepsFileUploadDetailComponent;
    let fixture: ComponentFixture<PrepsFileUploadDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ prepsFileUpload: new PrepsFileUpload(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepsFileUploadDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PrepsFileUploadDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrepsFileUploadDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load prepsFileUpload on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.prepsFileUpload).toEqual(jasmine.objectContaining({ id: 123 }));
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
