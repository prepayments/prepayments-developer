import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';
import { PrepaymentDataComponent } from './prepayment-data.component';
import { PrepaymentDataDetailComponent } from './prepayment-data-detail.component';
import { PrepaymentDataUpdateComponent } from './prepayment-data-update.component';
import { PrepaymentDataDeleteDialogComponent } from './prepayment-data-delete-dialog.component';
import { prepaymentDataRoute } from './prepayment-data.route';

@NgModule({
  imports: [PrepaymentsDeveloperSharedModule, RouterModule.forChild(prepaymentDataRoute)],
  declarations: [
    PrepaymentDataComponent,
    PrepaymentDataDetailComponent,
    PrepaymentDataUpdateComponent,
    PrepaymentDataDeleteDialogComponent,
  ],
  entryComponents: [PrepaymentDataDeleteDialogComponent],
})
export class PrepaymentsDeveloperPrepaymentDataModule {}
