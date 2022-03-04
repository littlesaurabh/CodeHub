import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourcesPage } from './cources.page';

const routes: Routes = [
  {
    path: '',
    component: CourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourcesPageRoutingModule {}
