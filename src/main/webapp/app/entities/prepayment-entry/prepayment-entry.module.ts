import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';
import { PrepaymentEntryComponent } from './prepayment-entry.component';
import { PrepaymentEntryDetailComponent } from './prepayment-entry-detail.component';
import { PrepaymentEntryUpdateComponent } from './prepayment-entry-update.component';
import { PrepaymentEntryDeleteDialogComponent } from './prepayment-entry-delete-dialog.component';
import { prepaymentEntryRoute } from './prepayment-entry.route';

@NgModule({
  imports: [PrepaymentsDeveloperSharedModule, RouterModule.forChild(prepaymentEntryRoute)],
  declarations: [
    PrepaymentEntryComponent,
    PrepaymentEntryDetailComponent,
    PrepaymentEntryUpdateComponent,
    PrepaymentEntryDeleteDialogComponent,
  ],
  entryComponents: [PrepaymentEntryDeleteDialogComponent],
})
export class PrepaymentsDeveloperPrepaymentEntryModule {}
