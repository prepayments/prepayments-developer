import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPrepsFileType } from 'app/shared/model/preps/preps-file-type.model';

type EntityResponseType = HttpResponse<IPrepsFileType>;
type EntityArrayResponseType = HttpResponse<IPrepsFileType[]>;

@Injectable({ providedIn: 'root' })
export class PrepsFileTypeService {
  public resourceUrl = SERVER_API_URL + 'api/preps-file-types';

  constructor(protected http: HttpClient) {}

  create(prepsFileType: IPrepsFileType): Observable<EntityResponseType> {
    return this.http.post<IPrepsFileType>(this.resourceUrl, prepsFileType, { observe: 'response' });
  }

  update(prepsFileType: IPrepsFileType): Observable<EntityResponseType> {
    return this.http.put<IPrepsFileType>(this.resourceUrl, prepsFileType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrepsFileType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrepsFileType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
