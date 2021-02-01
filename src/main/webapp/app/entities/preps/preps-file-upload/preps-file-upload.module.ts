import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';
import { PrepsFileUploadComponent } from './preps-file-upload.component';
import { PrepsFileUploadDetailComponent } from './preps-file-upload-detail.component';
import { PrepsFileUploadUpdateComponent } from './preps-file-upload-update.component';
import { PrepsFileUploadDeleteDialogComponent } from './preps-file-upload-delete-dialog.component';
import { prepsFileUploadRoute } from './preps-file-upload.route';

@NgModule({
  imports: [PrepaymentsDeveloperSharedModule, RouterModule.forChild(prepsFileUploadRoute)],
  declarations: [
    PrepsFileUploadComponent,
    PrepsFileUploadDetailComponent,
    PrepsFileUploadUpdateComponent,
    PrepsFileUploadDeleteDialogComponent,
  ],
  entryComponents: [PrepsFileUploadDeleteDialogComponent],
})
export class PrepaymentsDeveloperPrepsFileUploadModule {}
