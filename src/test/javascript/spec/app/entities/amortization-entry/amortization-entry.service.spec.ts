import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { AmortizationEntryService } from 'app/entities/amortization-entry/amortization-entry.service';
import { IAmortizationEntry, AmortizationEntry } from 'app/shared/model/amortization-entry.model';

describe('Service Tests', () => {
  describe('AmortizationEntry Service', () => {
    let injector: TestBed;
    let service: AmortizationEntryService;
    let httpMock: HttpTestingController;
    let elemDefault: IAmortizationEntry;
    let expectedResult: IAmortizationEntry | IAmortizationEntry[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AmortizationEntryService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AmortizationEntry(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        0,
        currentDate,
        'AAAAAAA',
        0,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            prepaymentDate: currentDate.format(DATE_FORMAT),
            amortizationDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AmortizationEntry', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            prepaymentDate: currentDate.format(DATE_FORMAT),
            amortizationDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prepaymentDate: currentDate,
            amortizationDate: currentDate,
          },
          returnedFromService
        );

        service.create(new AmortizationEntry()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AmortizationEntry', () => {
        const returnedFromService = Object.assign(
          {
            accountName: 'BBBBBB',
            description: 'BBBBBB',
            accountNumber: 'BBBBBB',
            expenseAccountNumber: 'BBBBBB',
            prepaymentNumber: 'BBBBBB',
            prepaymentDate: currentDate.format(DATE_FORMAT),
            transactionAmount: 1,
            amortizationDate: currentDate.format(DATE_FORMAT),
            uploadToken: 'BBBBBB',
            prepaymentDataId: 1,
            compilationToken: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prepaymentDate: currentDate,
            amortizationDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AmortizationEntry', () => {
        const returnedFromService = Object.assign(
          {
            accountName: 'BBBBBB',
            description: 'BBBBBB',
            accountNumber: 'BBBBBB',
            expenseAccountNumber: 'BBBBBB',
            prepaymentNumber: 'BBBBBB',
            prepaymentDate: currentDate.format(DATE_FORMAT),
            transactionAmount: 1,
            amortizationDate: currentDate.format(DATE_FORMAT),
            uploadToken: 'BBBBBB',
            prepaymentDataId: 1,
            compilationToken: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prepaymentDate: currentDate,
            amortizationDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AmortizationEntry', () => {
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
