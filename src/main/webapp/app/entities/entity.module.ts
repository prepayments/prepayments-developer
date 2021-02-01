import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'prepayment-entry',
        loadChildren: () => import('./prepayment-entry/prepayment-entry.module').then(m => m.PrepaymentsDeveloperPrepaymentEntryModule),
      },
      {
        path: 'amortization-entry',
        loadChildren: () =>
          import('./amortization-entry/amortization-entry.module').then(m => m.PrepaymentsDeveloperAmortizationEntryModule),
      },
      {
        path: 'prepayment-data',
        loadChildren: () => import('./prepayment-data/prepayment-data.module').then(m => m.PrepaymentsDeveloperPrepaymentDataModule),
      },
      {
        path: 'preps-file-type',
        loadChildren: () => import('./preps/preps-file-type/preps-file-type.module').then(m => m.PrepaymentsDeveloperPrepsFileTypeModule),
      },
      {
        path: 'preps-file-upload',
        loadChildren: () =>
          import('./preps/preps-file-upload/preps-file-upload.module').then(m => m.PrepaymentsDeveloperPrepsFileUploadModule),
      },
      {
        path: 'preps-message-token',
        loadChildren: () =>
          import('./preps/preps-message-token/preps-message-token.module').then(m => m.PrepaymentsDeveloperPrepsMessageTokenModule),
      },
      {
        path: 'compilation-request',
        loadChildren: () =>
          import('./compilation-request/compilation-request.module').then(m => m.PrepaymentsDeveloperCompilationRequestModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class PrepaymentsDeveloperEntityModule {}
