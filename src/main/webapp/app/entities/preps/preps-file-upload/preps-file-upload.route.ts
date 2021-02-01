import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrepsFileUpload, PrepsFileUpload } from 'app/shared/model/preps/preps-file-upload.model';
import { PrepsFileUploadService } from './preps-file-upload.service';
import { PrepsFileUploadComponent } from './preps-file-upload.component';
import { PrepsFileUploadDetailComponent } from './preps-file-upload-detail.component';
import { PrepsFileUploadUpdateComponent } from './preps-file-upload-update.component';

@Injectable({ providedIn: 'root' })
export class PrepsFileUploadResolve implements Resolve<IPrepsFileUpload> {
  constructor(private service: PrepsFileUploadService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrepsFileUpload> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((prepsFileUpload: HttpResponse<PrepsFileUpload>) => {
          if (prepsFileUpload.body) {
            return of(prepsFileUpload.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PrepsFileUpload());
  }
}

export const prepsFileUploadRoute: Routes = [
  {
    path: '',
    component: PrepsFileUploadComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'PrepsFileUploads',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrepsFileUploadDetailComponent,
    resolve: {
      prepsFileUpload: PrepsFileUploadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsFileUploads',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrepsFileUploadUpdateComponent,
    resolve: {
      prepsFileUpload: PrepsFileUploadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsFileUploads',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrepsFileUploadUpdateComponent,
    resolve: {
      prepsFileUpload: PrepsFileUploadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PrepsFileUploads',
    },
    canActivate: [UserRouteAccessService],
  },
];
