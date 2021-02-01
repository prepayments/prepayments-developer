import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPrepsMessageToken } from 'app/shared/model/preps/preps-message-token.model';

type EntityResponseType = HttpResponse<IPrepsMessageToken>;
type EntityArrayResponseType = HttpResponse<IPrepsMessageToken[]>;

@Injectable({ providedIn: 'root' })
export class PrepsMessageTokenService {
  public resourceUrl = SERVER_API_URL + 'api/preps-message-tokens';

  constructor(protected http: HttpClient) {}

  create(prepsMessageToken: IPrepsMessageToken): Observable<EntityResponseType> {
    return this.http.post<IPrepsMessageToken>(this.resourceUrl, prepsMessageToken, { observe: 'response' });
  }

  update(prepsMessageToken: IPrepsMessageToken): Observable<EntityResponseType> {
    return this.http.put<IPrepsMessageToken>(this.resourceUrl, prepsMessageToken, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrepsMessageToken>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrepsMessageToken[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
