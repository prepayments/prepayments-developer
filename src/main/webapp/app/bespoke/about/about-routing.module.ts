import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ABOUT_APP_ROUTE } from 'app/bespoke/about/about-app.route';

const routes: Routes = [ABOUT_APP_ROUTE];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
