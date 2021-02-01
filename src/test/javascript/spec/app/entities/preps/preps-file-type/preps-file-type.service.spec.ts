import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PrepsFileTypeService } from 'app/entities/preps/preps-file-type/preps-file-type.service';
import { IPrepsFileType, PrepsFileType } from 'app/shared/model/preps/preps-file-type.model';
import { PrepsFileMediumTypes } from 'app/shared/model/enumerations/preps-file-medium-types.model';
import { PrepsFileModelType } from 'app/shared/model/enumerations/preps-file-model-type.model';
import { PrepsFileDeleteProcessType } from 'app/shared/model/enumerations/preps-file-delete-process-type.model';

describe('Service Tests', () => {
  describe('PrepsFileType Service', () => {
    let injector: TestBed;
    let service: PrepsFileTypeService;
    let httpMock: HttpTestingController;
    let elemDefault: IPrepsFileType;
    let expectedResult: IPrepsFileType | IPrepsFileType[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PrepsFileTypeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PrepsFileType(
        0,
        'AAAAAAA',
        PrepsFileMediumTypes.EXCEL,
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        PrepsFileModelType.CURRENCY_LIST,
        PrepsFileDeleteProcessType.DELETE_PREPAYMENT_DATA
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PrepsFileType', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PrepsFileType()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PrepsFileType', () => {
        const returnedFromService = Object.assign(
          {
            prepsFileTypeName: 'BBBBBB',
            prepsFileMediumType: 'BBBBBB',
            description: 'BBBBBB',
            fileTemplate: 'BBBBBB',
            prepsfileType: 'BBBBBB',
            prepsfileDeleteProcessType: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PrepsFileType', () => {
        const returnedFromService = Object.assign(
          {
            prepsFileTypeName: 'BBBBBB',
            prepsFileMediumType: 'BBBBBB',
            description: 'BBBBBB',
            fileTemplate: 'BBBBBB',
            prepsfileType: 'BBBBBB',
            prepsfileDeleteProcessType: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PrepsFileType', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
