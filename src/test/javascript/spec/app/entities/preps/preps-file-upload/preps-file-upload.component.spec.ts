import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { PrepaymentsDeveloperTestModule } from '../../../../test.module';
import { PrepsFileUploadComponent } from 'app/entities/preps/preps-file-upload/preps-file-upload.component';
import { PrepsFileUploadService } from 'app/entities/preps/preps-file-upload/preps-file-upload.service';
import { PrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';

describe('Component Tests', () => {
  describe('PrepsFileUpload Management Component', () => {
    let comp: PrepsFileUploadComponent;
    let fixture: ComponentFixture<PrepsFileUploadComponent>;
    let service: PrepsFileUploadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrepaymentsDeveloperTestModule],
        declarations: [PrepsFileUploadComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(PrepsFileUploadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrepsFileUploadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrepsFileUploadService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PrepsFileUpload(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.prepsFileUploads && comp.prepsFileUploads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PrepsFileUpload(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.prepsFileUploads && comp.prepsFileUploads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
