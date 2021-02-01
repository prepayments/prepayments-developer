import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrepsMessageToken, PrepsMessageToken } from 'app/shared/model/preps/preps-message-token.model';
import { PrepsMessageTokenService } from './preps-message-token.service';
import { PrepsMessageTokenComponent } from './preps-message-token.component';
import { PrepsMessageTokenDetailComponent } from './preps-message-token-detail.component';
import { PrepsMessageTokenUpdateComponent } from './preps-message-token-update.component';

@Injectable({ providedIn: 'root' })
export class PrepsMessageTokenResolve implements Resolve<IPrepsMessageToken> {
  constructor(private service: PrepsMessageTokenService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrepsMessageToken> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((prepsMessageToken: HttpResponse<PrepsMessageToken>) => {
          if (prepsMessageToken.body) {
            return of(prepsMessageToken.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PrepsMessageToken());
  }
}

export const prepsMessageTokenRoute: Routes = [
  {
    path: '',
    component: PrepsMessageTokenComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'PrepsMessageTokens',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrepsMessageTokenDetailComponent,
    resolve: {
      prepsMessageToken: PrepsMessageTokenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsMessageTokens',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrepsMessageTokenUpdateComponent,
    resolve: {
      prepsMessageToken: PrepsMessageTokenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsMessageTokens',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrepsMessageTokenUpdateComponent,
    resolve: {
      prepsMessageToken: PrepsMessageTokenResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsMessageTokens',
    },
    canActivate: [UserRouteAccessService],
  },
];
