import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompilationRequestService } from 'app/entities/compilation-request/compilation-request.service';
import { ICompilationRequest, CompilationRequest } from 'app/shared/model/compilation-request.model';
import { CompilationStatus } from 'app/shared/model/enumerations/compilation-status.model';
import { CompilationType } from 'app/shared/model/enumerations/compilation-type.model';

describe('Service Tests', () => {
  describe('CompilationRequest Service', () => {
    let injector: TestBed;
    let service: CompilationRequestService;
    let httpMock: HttpTestingController;
    let elemDefault: ICompilationRequest;
    let expectedResult: ICompilationRequest | ICompilationRequest[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CompilationRequestService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new CompilationRequest(
        0,
        'AAAAAAA',
        0,
        CompilationStatus.IN_PROGRESS,
        CompilationType.AMORTIZATION_ENTRY_COMPILATION,
        'AAAAAAA'
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

      it('should create a CompilationRequest', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CompilationRequest()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CompilationRequest', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            fileUploadId: 1,
            compilationStatus: 'BBBBBB',
            compilationType: 'BBBBBB',
            compilationToken: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CompilationRequest', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            fileUploadId: 1,
            compilationStatus: 'BBBBBB',
            compilationType: 'BBBBBB',
            compilationToken: 'BBBBBB',
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

      it('should delete a CompilationRequest', () => {
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
