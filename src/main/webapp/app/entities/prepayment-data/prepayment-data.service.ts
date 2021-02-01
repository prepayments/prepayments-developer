import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IPrepaymentData } from 'app/shared/model/prepayment-data.model';

type EntityResponseType = HttpResponse<IPrepaymentData>;
type EntityArrayResponseType = HttpResponse<IPrepaymentData[]>;

@Injectable({ providedIn: 'root' })
export class PrepaymentDataService {
  public resourceUrl = SERVER_API_URL + 'api/prepayment-data';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/prepayment-data';

  constructor(protected http: HttpClient) {}

  create(prepaymentData: IPrepaymentData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentData);
    return this.http
      .post<IPrepaymentData>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(prepaymentData: IPrepaymentData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepaymentData);
    return this.http
      .put<IPrepaymentData>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPrepaymentData>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrepaymentData[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrepaymentData[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(prepaymentData: IPrepaymentData): IPrepaymentData {
    const copy: IPrepaymentData = Object.assign({}, prepaymentData, {
      prepaymentDate:
        prepaymentData.prepaymentDate && prepaymentData.prepaymentDate.isValid()
          ? prepaymentData.prepaymentDate.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.prepaymentDate = res.body.prepaymentDate ? moment(res.body.prepaymentDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((prepaymentData: IPrepaymentData) => {
        prepaymentData.prepaymentDate = prepaymentData.prepaymentDate ? moment(prepaymentData.prepaymentDate) : undefined;
      });
    }
    return res;
  }
}
