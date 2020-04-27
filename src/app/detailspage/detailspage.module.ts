import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailspagePageRoutingModule } from './detailspage-routing.module';

import { DetailspagePage } from './detailspage.page';
import {LeadPageModule} from '../lead/lead.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailspagePageRoutingModule,
    LeadPageModule
  ],
  declarations: [DetailspagePage]
})
export class DetailspagePageModule {}
