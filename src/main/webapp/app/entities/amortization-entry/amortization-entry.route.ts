import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAmortizationEntry, AmortizationEntry } from 'app/shared/model/amortization-entry.model';
import { AmortizationEntryService } from './amortization-entry.service';
import { AmortizationEntryComponent } from './amortization-entry.component';
import { AmortizationEntryDetailComponent } from './amortization-entry-detail.component';
import { AmortizationEntryUpdateComponent } from './amortization-entry-update.component';

@Injectable({ providedIn: 'root' })
export class AmortizationEntryResolve implements Resolve<IAmortizationEntry> {
  constructor(private service: AmortizationEntryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAmortizationEntry> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((amortizationEntry: HttpResponse<AmortizationEntry>) => {
          if (amortizationEntry.body) {
            return of(amortizationEntry.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AmortizationEntry());
  }
}

export const amortizationEntryRoute: Routes = [
  {
    path: '',
    component: AmortizationEntryComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'AmortizationEntries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AmortizationEntryDetailComponent,
    resolve: {
      amortizationEntry: AmortizationEntryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AmortizationEntries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AmortizationEntryUpdateComponent,
    resolve: {
      amortizationEntry: AmortizationEntryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AmortizationEntries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AmortizationEntryUpdateComponent,
    resolve: {
      amortizationEntry: AmortizationEntryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AmortizationEntries',
    },
    canActivate: [UserRouteAccessService],
  },
];
