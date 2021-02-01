import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';
import { PrepsFileTypeComponent } from './preps-file-type.component';
import { PrepsFileTypeDetailComponent } from './preps-file-type-detail.component';
import { PrepsFileTypeUpdateComponent } from './preps-file-type-update.component';
import { PrepsFileTypeDeleteDialogComponent } from './preps-file-type-delete-dialog.component';
import { prepsFileTypeRoute } from './preps-file-type.route';

@NgModule({
  imports: [PrepaymentsDeveloperSharedModule, RouterModule.forChild(prepsFileTypeRoute)],
  declarations: [PrepsFileTypeComponent, PrepsFileTypeDetailComponent, PrepsFileTypeUpdateComponent, PrepsFileTypeDeleteDialogComponent],
  entryComponents: [PrepsFileTypeDeleteDialogComponent],
})
export class PrepaymentsDeveloperPrepsFileTypeModule {}
