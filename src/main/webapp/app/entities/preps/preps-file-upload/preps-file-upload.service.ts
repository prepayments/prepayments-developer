import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';

type EntityResponseType = HttpResponse<IPrepsFileUpload>;
type EntityArrayResponseType = HttpResponse<IPrepsFileUpload[]>;

@Injectable({ providedIn: 'root' })
export class PrepsFileUploadService {
  public resourceUrl = SERVER_API_URL + 'api/preps-file-uploads';

  constructor(protected http: HttpClient) {}

  create(prepsFileUpload: IPrepsFileUpload): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepsFileUpload);
    return this.http
      .post<IPrepsFileUpload>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(prepsFileUpload: IPrepsFileUpload): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prepsFileUpload);
    return this.http
      .put<IPrepsFileUpload>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPrepsFileUpload>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrepsFileUpload[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(prepsFileUpload: IPrepsFileUpload): IPrepsFileUpload {
    const copy: IPrepsFileUpload = Object.assign({}, prepsFileUpload, {
      periodFrom:
        prepsFileUpload.periodFrom && prepsFileUpload.periodFrom.isValid() ? prepsFileUpload.periodFrom.format(DATE_FORMAT) : undefined,
      periodTo: prepsFileUpload.periodTo && prepsFileUpload.periodTo.isValid() ? prepsFileUpload.periodTo.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.periodFrom = res.body.periodFrom ? moment(res.body.periodFrom) : undefined;
      res.body.periodTo = res.body.periodTo ? moment(res.body.periodTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((prepsFileUpload: IPrepsFileUpload) => {
        prepsFileUpload.periodFrom = prepsFileUpload.periodFrom ? moment(prepsFileUpload.periodFrom) : undefined;
        prepsFileUpload.periodTo = prepsFileUpload.periodTo ? moment(prepsFileUpload.periodTo) : undefined;
      });
    }
    return res;
  }
}
