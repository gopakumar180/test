import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesexecutivePageRoutingModule } from './salesexecutive-routing.module';

import { SalesexecutivePage } from './salesexecutive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesexecutivePageRoutingModule
  ],
  declarations: [SalesexecutivePage]
})
export class SalesexecutivePageModule {}
