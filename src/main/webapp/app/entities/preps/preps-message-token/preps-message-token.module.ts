import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';
import { PrepsMessageTokenComponent } from './preps-message-token.component';
import { PrepsMessageTokenDetailComponent } from './preps-message-token-detail.component';
import { PrepsMessageTokenUpdateComponent } from './preps-message-token-update.component';
import { PrepsMessageTokenDeleteDialogComponent } from './preps-message-token-delete-dialog.component';
import { prepsMessageTokenRoute } from './preps-message-token.route';

@NgModule({
  imports: [PrepaymentsDeveloperSharedModule, RouterModule.forChild(prepsMessageTokenRoute)],
  declarations: [
    PrepsMessageTokenComponent,
    PrepsMessageTokenDetailComponent,
    PrepsMessageTokenUpdateComponent,
    PrepsMessageTokenDeleteDialogComponent,
  ],
  entryComponents: [PrepsMessageTokenDeleteDialogComponent],
})
export class PrepaymentsDeveloperPrepsMessageTokenModule {}
