import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IAmortizationEntry } from 'app/shared/model/amortization-entry.model';

type EntityResponseType = HttpResponse<IAmortizationEntry>;
type EntityArrayResponseType = HttpResponse<IAmortizationEntry[]>;

@Injectable({ providedIn: 'root' })
export class AmortizationEntryService {
  public resourceUrl = SERVER_API_URL + 'api/amortization-entries';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/amortization-entries';

  constructor(protected http: HttpClient) {}

  create(amortizationEntry: IAmortizationEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amortizationEntry);
    return this.http
      .post<IAmortizationEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(amortizationEntry: IAmortizationEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amortizationEntry);
    return this.http
      .put<IAmortizationEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAmortizationEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAmortizationEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAmortizationEntry[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(amortizationEntry: IAmortizationEntry): IAmortizationEntry {
    const copy: IAmortizationEntry = Object.assign({}, amortizationEntry, {
      prepaymentDate:
        amortizationEntry.prepaymentDate && amortizationEntry.prepaymentDate.isValid()
          ? amortizationEntry.prepaymentDate.format(DATE_FORMAT)
          : undefined,
      amortizationDate:
        amortizationEntry.amortizationDate && amortizationEntry.amortizationDate.isValid()
          ? amortizationEntry.amortizationDate.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.prepaymentDate = res.body.prepaymentDate ? moment(res.body.prepaymentDate) : undefined;
      res.body.amortizationDate = res.body.amortizationDate ? moment(res.body.amortizationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((amortizationEntry: IAmortizationEntry) => {
        amortizationEntry.prepaymentDate = amortizationEntry.prepaymentDate ? moment(amortizationEntry.prepaymentDate) : undefined;
        amortizationEntry.amortizationDate = amortizationEntry.amortizationDate ? moment(amortizationEntry.amortizationDate) : undefined;
      });
    }
    return res;
  }
}
