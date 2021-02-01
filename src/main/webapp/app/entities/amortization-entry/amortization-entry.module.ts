import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';
import { AmortizationEntryComponent } from './amortization-entry.component';
import { AmortizationEntryDetailComponent } from './amortization-entry-detail.component';
import { AmortizationEntryUpdateComponent } from './amortization-entry-update.component';
import { AmortizationEntryDeleteDialogComponent } from './amortization-entry-delete-dialog.component';
import { amortizationEntryRoute } from './amortization-entry.route';

@NgModule({
  imports: [PrepaymentsDeveloperSharedModule, RouterModule.forChild(amortizationEntryRoute)],
  declarations: [
    AmortizationEntryComponent,
    AmortizationEntryDetailComponent,
    AmortizationEntryUpdateComponent,
    AmortizationEntryDeleteDialogComponent,
  ],
  entryComponents: [AmortizationEntryDeleteDialogComponent],
})
export class PrepaymentsDeveloperAmortizationEntryModule {}
