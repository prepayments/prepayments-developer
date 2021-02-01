import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PrepaymentDataService } from 'app/entities/prepayment-data/prepayment-data.service';
import { IPrepaymentData, PrepaymentData } from 'app/shared/model/prepayment-data.model';

describe('Service Tests', () => {
  describe('PrepaymentData Service', () => {
    let injector: TestBed;
    let service: PrepaymentDataService;
    let httpMock: HttpTestingController;
    let elemDefault: IPrepaymentData;
    let expectedResult: IPrepaymentData | IPrepaymentData[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PrepaymentDataService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PrepaymentData(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 0, 0, 'AAAAAAA');
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

      it('should create a PrepaymentData', () => {
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

        service.create(new PrepaymentData()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PrepaymentData', () => {
        const returnedFromService = Object.assign(
          {
            accountName: 'BBBBBB',
            description: 'BBBBBB',
            accountNumber: 'BBBBBB',
            expenseAccountNumber: 'BBBBBB',
            prepaymentNumber: 'BBBBBB',
            prepaymentDate: currentDate.format(DATE_FORMAT),
            prepaymentAmount: 1,
            prepaymentPeriods: 1,
            uploadToken: 'BBBBBB',
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

      it('should return a list of PrepaymentData', () => {
        const returnedFromService = Object.assign(
          {
            accountName: 'BBBBBB',
            description: 'BBBBBB',
            accountNumber: 'BBBBBB',
            expenseAccountNumber: 'BBBBBB',
            prepaymentNumber: 'BBBBBB',
            prepaymentDate: currentDate.format(DATE_FORMAT),
            prepaymentAmount: 1,
            prepaymentPeriods: 1,
            uploadToken: 'BBBBBB',
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

      it('should delete a PrepaymentData', () => {
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
