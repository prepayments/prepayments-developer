import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent } from './data-table/data-table.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthExpiredInterceptor } from 'app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from 'app/blocks/interceptor/notification.interceptor';
import { RouterModule, Routes } from '@angular/router';
import { FilesMenuComponent } from './files-menu/files-menu.component';
import { NavigationQuestionnaireComponent } from './navigation-questionnaire/navigation-questionnaire.component';
import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';

const routes: Routes = [];
@NgModule({
  declarations: [DataTableComponent, FilesMenuComponent, NavigationQuestionnaireComponent],
  imports: [CommonModule, PrepaymentsDeveloperSharedModule, RouterModule.forChild(routes)],
  exports: [DataTableComponent, FilesMenuComponent, NavigationQuestionnaireComponent],
  entryComponents: [DataTableComponent, FilesMenuComponent, NavigationQuestionnaireComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
    },
  ],
})
export class BespokeNavigationModule {}
