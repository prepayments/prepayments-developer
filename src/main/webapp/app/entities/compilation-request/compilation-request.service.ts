import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ICompilationRequest } from 'app/shared/model/compilation-request.model';

type EntityResponseType = HttpResponse<ICompilationRequest>;
type EntityArrayResponseType = HttpResponse<ICompilationRequest[]>;

@Injectable({ providedIn: 'root' })
export class CompilationRequestService {
  public resourceUrl = SERVER_API_URL + 'api/compilation-requests';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/compilation-requests';

  constructor(protected http: HttpClient) {}

  create(compilationRequest: ICompilationRequest): Observable<EntityResponseType> {
    return this.http.post<ICompilationRequest>(this.resourceUrl, compilationRequest, { observe: 'response' });
  }

  update(compilationRequest: ICompilationRequest): Observable<EntityResponseType> {
    return this.http.put<ICompilationRequest>(this.resourceUrl, compilationRequest, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompilationRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompilationRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompilationRequest[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
