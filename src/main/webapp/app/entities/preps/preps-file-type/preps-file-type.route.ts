import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrepsFileType, PrepsFileType } from 'app/shared/model/preps/preps-file-type.model';
import { PrepsFileTypeService } from './preps-file-type.service';
import { PrepsFileTypeComponent } from './preps-file-type.component';
import { PrepsFileTypeDetailComponent } from './preps-file-type-detail.component';
import { PrepsFileTypeUpdateComponent } from './preps-file-type-update.component';

@Injectable({ providedIn: 'root' })
export class PrepsFileTypeResolve implements Resolve<IPrepsFileType> {
  constructor(private service: PrepsFileTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrepsFileType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((prepsFileType: HttpResponse<PrepsFileType>) => {
          if (prepsFileType.body) {
            return of(prepsFileType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PrepsFileType());
  }
}

export const prepsFileTypeRoute: Routes = [
  {
    path: '',
    component: PrepsFileTypeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'PrepsFileTypes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrepsFileTypeDetailComponent,
    resolve: {
      prepsFileType: PrepsFileTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsFileTypes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrepsFileTypeUpdateComponent,
    resolve: {
      prepsFileType: PrepsFileTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsFileTypes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrepsFileTypeUpdateComponent,
    resolve: {
      prepsFileType: PrepsFileTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsFileTypes',
    },
    canActivate: [UserRouteAccessService],
  },
];
