import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { PrepaymentsDeveloperSharedModule } from 'app/shared/shared.module';
import { PrepaymentsDeveloperCoreModule } from 'app/core/core.module';
import { PrepaymentsDeveloperAppRoutingModule } from './app-routing.module';
import { PrepaymentsDeveloperHomeModule } from './home/home.module';
import { PrepaymentsDeveloperEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { BespokeModule } from './bespoke/bespoke.module';

@NgModule({
  imports: [
    BrowserModule,
    PrepaymentsDeveloperSharedModule,
    PrepaymentsDeveloperCoreModule,
    PrepaymentsDeveloperHomeModule,
    BespokeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    PrepaymentsDeveloperEntityModule,
    PrepaymentsDeveloperAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class PrepaymentsDeveloperAppModule {}
