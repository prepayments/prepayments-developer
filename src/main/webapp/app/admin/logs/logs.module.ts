import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrepayssetsDevSharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';

import { logsRoute } from './logs.route';

@NgModule({
  imports: [PrepayssetsDevSharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent],
})
export class LogsModule {}
