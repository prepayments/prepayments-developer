import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrepaymentData, PrepaymentData } from 'app/shared/model/prepayment-data.model';
import { PrepaymentDataService } from './prepayment-data.service';
import { PrepaymentDataComponent } from './prepayment-data.component';
import { PrepaymentDataDetailComponent } from './prepayment-data-detail.component';
import { PrepaymentDataUpdateComponent } from './prepayment-data-update.component';

@Injectable({ providedIn: 'root' })
export class PrepaymentDataResolve implements Resolve<IPrepaymentData> {
  constructor(private service: PrepaymentDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrepaymentData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((prepaymentData: HttpResponse<PrepaymentData>) => {
          if (prepaymentData.body) {
            return of(prepaymentData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PrepaymentData());
  }
}

export const prepaymentDataRoute: Routes = [
  {
    path: '',
    component: PrepaymentDataComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'PrepaymentData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrepaymentDataDetailComponent,
    resolve: {
      prepaymentData: PrepaymentDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepaymentData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrepaymentDataUpdateComponent,
    resolve: {
      prepaymentData: PrepaymentDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepaymentData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrepaymentDataUpdateComponent,
    resolve: {
      prepaymentData: PrepaymentDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepaymentData',
    },
    canActivate: [UserRouteAccessService],
  },
];
