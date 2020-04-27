import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesexecutivePage } from './salesexecutive.page';

const routes: Routes = [
  {
    path: '',
    component: SalesexecutivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesexecutivePageRoutingModule {}
