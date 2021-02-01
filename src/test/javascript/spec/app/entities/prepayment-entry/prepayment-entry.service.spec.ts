import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PrepaymentEntryService } from 'app/entities/prepayment-entry/prepayment-entry.service';
import { IPrepaymentEntry, PrepaymentEntry } from 'app/shared/model/prepayment-entry.model';

describe('Service Tests', () => {
  describe('PrepaymentEntry Service', () => {
    let injector: TestBed;
    let service: PrepaymentEntryService;
    let httpMock: HttpTestingController;
    let elemDefault: IPrepaymentEntry;
    let expectedResult: IPrepaymentEntry | IPrepaymentEntry[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PrepaymentEntryService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PrepaymentEntry(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 0, 'AAAAAAA', 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            prepaymentDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PrepaymentEntry', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            prepaymentDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prepaymentDate: currentDate,
          },
          returnedFromService
        );

        service.create(new PrepaymentEntry()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PrepaymentEntry', () => {
        const returnedFromService = Object.assign(
          {
            accountName: 'BBBBBB',
            description: 'BBBBBB',
            accountNumber: 'BBBBBB',
            prepaymentNumber: 'BBBBBB',
            prepaymentDate: currentDate.format(DATE_FORMAT),
            transactionAmount: 1,
            uploadToken: 'BBBBBB',
            prepaymentDataId: 1,
            compilationToken: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prepaymentDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PrepaymentEntry', () => {
        const returnedFromService = Object.assign(
          {
            accountName: 'BBBBBB',
            description: 'BBBBBB',
            accountNumber: 'BBBBBB',
            prepaymentNumber: 'BBBBBB',
            prepaymentDate: currentDate.format(DATE_FORMAT),
            transactionAmount: 1,
            uploadToken: 'BBBBBB',
            prepaymentDataId: 1,
            compilationToken: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prepaymentDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PrepaymentEntry', () => {
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
