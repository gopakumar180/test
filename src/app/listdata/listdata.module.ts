import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListdataPageRoutingModule } from './listdata-routing.module';

import { ListdataPage } from './listdata.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListdataPageRoutingModule
    
  ],
  declarations: [ListdataPage],
  entryComponents:[]
})
export class ListdataPageModule {}
