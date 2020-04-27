import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HTTP} from '@ionic-native/http/ngx';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { ModelService} from './service/model.service';
import {ListService} from './service/list.service';
import {SalesexecutiveService} from './service/salesexecutive.service'

import { HttpClientService} from './service/common/http-client.service'
import { Network } from '@ionic-native/network/ngx';
import {Tab1PageModule} from "./tab1/tab1.module";
import {Tab2PageModule} from "./tab2/tab2.module";
import {Tab3PageModule} from "./tab3/tab3.module";
import {TabsPageModule} from "./tabs/tabs.module";
import {LeadPageModule} from './lead/lead.module'
import { from } from 'rxjs';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    Tab1PageModule,
        Tab2PageModule,
        Tab3PageModule,
        TabsPageModule,
    FormsModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    ModelService,
    ListService,
    HttpClientService,
    SalesexecutiveService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
