import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefePage } from './chefe.page';

const routes: Routes = [
  {
    path: '',
    component: ChefePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefePageRoutingModule {}
