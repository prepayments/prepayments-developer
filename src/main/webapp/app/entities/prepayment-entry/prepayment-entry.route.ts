import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrepaymentEntry, PrepaymentEntry } from 'app/shared/model/prepayment-entry.model';
import { PrepaymentEntryService } from './prepayment-entry.service';
import { PrepaymentEntryComponent } from './prepayment-entry.component';
import { PrepaymentEntryDetailComponent } from './prepayment-entry-detail.component';
import { PrepaymentEntryUpdateComponent } from './prepayment-entry-update.component';

@Injectable({ providedIn: 'root' })
export class PrepaymentEntryResolve implements Resolve<IPrepaymentEntry> {
  constructor(private service: PrepaymentEntryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrepaymentEntry> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((prepaymentEntry: HttpResponse<PrepaymentEntry>) => {
          if (prepaymentEntry.body) {
            return of(prepaymentEntry.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PrepaymentEntry());
  }
}

export const prepaymentEntryRoute: Routes = [
  {
    path: '',
    component: PrepaymentEntryComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'PrepaymentEntries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrepaymentEntryDetailComponent,
    resolve: {
      prepaymentEntry: PrepaymentEntryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepaymentEntries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrepaymentEntryUpdateComponent,
    resolve: {
      prepaymentEntry: PrepaymentEntryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepaymentEntries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrepaymentEntryUpdateComponent,
    resolve: {
      prepaymentEntry: PrepaymentEntryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepaymentEntries',
    },
    canActivate: [UserRouteAccessService],
  },
];
