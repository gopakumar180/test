import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListdataPage } from './listdata.page';

const routes: Routes = [
  {
    path: '',
    component: ListdataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListdataPageRoutingModule {}
