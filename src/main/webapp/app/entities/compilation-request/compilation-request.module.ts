import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';
import { CompilationRequestComponent } from './compilation-request.component';
import { CompilationRequestDetailComponent } from './compilation-request-detail.component';
import { CompilationRequestUpdateComponent } from './compilation-request-update.component';
import { CompilationRequestDeleteDialogComponent } from './compilation-request-delete-dialog.component';
import { compilationRequestRoute } from './compilation-request.route';

@NgModule({
  imports: [PrepaymentsDeveloperSharedModule, RouterModule.forChild(compilationRequestRoute)],
  declarations: [
    CompilationRequestComponent,
    CompilationRequestDetailComponent,
    CompilationRequestUpdateComponent,
    CompilationRequestDeleteDialogComponent,
  ],
  entryComponents: [CompilationRequestDeleteDialogComponent],
})
export class PrepaymentsDeveloperCompilationRequestModule {}
