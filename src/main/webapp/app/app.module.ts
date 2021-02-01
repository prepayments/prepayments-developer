import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { PrepayssetsDevSharedModule } from 'app/shared/shared.module';
import { PrepayssetsDevCoreModule } from 'app/core/core.module';
import { PrepayssetsDevAppRoutingModule } from './app-routing.module';
import { PrepayssetsDevHomeModule } from './home/home.module';
import { PrepayssetsDevEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    PrepayssetsDevSharedModule,
    PrepayssetsDevCoreModule,
    PrepayssetsDevHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    PrepayssetsDevEntityModule,
    PrepayssetsDevAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class PrepayssetsDevAppModule {}
