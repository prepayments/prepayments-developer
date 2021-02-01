import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICompilationRequest, CompilationRequest } from 'app/shared/model/compilation-request.model';
import { CompilationRequestService } from './compilation-request.service';
import { CompilationRequestComponent } from './compilation-request.component';
import { CompilationRequestDetailComponent } from './compilation-request-detail.component';
import { CompilationRequestUpdateComponent } from './compilation-request-update.component';

@Injectable({ providedIn: 'root' })
export class CompilationRequestResolve implements Resolve<ICompilationRequest> {
  constructor(private service: CompilationRequestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompilationRequest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((compilationRequest: HttpResponse<CompilationRequest>) => {
          if (compilationRequest.body) {
            return of(compilationRequest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CompilationRequest());
  }
}

export const compilationRequestRoute: Routes = [
  {
    path: '',
    component: CompilationRequestComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'CompilationRequests',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompilationRequestDetailComponent,
    resolve: {
      compilationRequest: CompilationRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CompilationRequests',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompilationRequestUpdateComponent,
    resolve: {
      compilationRequest: CompilationRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CompilationRequests',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompilationRequestUpdateComponent,
    resolve: {
      compilationRequest: CompilationRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CompilationRequests',
    },
    canActivate: [UserRouteAccessService],
  },
];
