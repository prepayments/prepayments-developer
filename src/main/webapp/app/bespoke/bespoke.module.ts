import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutModule } from './about/about.module';
import { RouterModule, Routes } from '@angular/router';
import { BespokeNavigationModule } from 'app/bespoke/bespoke-navigation/bespoke-navigation.module';

const routes: Routes = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), BespokeNavigationModule, AboutModule],
  exports: [RouterModule, BespokeNavigationModule, AboutModule],
})
export class BespokeModule {}
