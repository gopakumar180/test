import { Injectable } from '@angular/core';
import { HttpClientService } from './common/http-client.service';
import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
import { tap, map, catchError } from "rxjs/operators";
import {Http, Headers, Response} from '@angular/http';
import { Observable, from } from 'rxjs';

import { Storage } from '@ionic/storage';
import { NetworkService, ConnectionStatus } from './network.service';
import { OfflineManagerService } from './offline-manager.service';
import { environment } from '../../environments/environment';
const API_STORAGE_KEY = 'Newspecialkey';
@Injectable()
export class SalesexecutiveService {

  constructor(private https: HttpClientService,
    private http: Http
   ,private networkService: NetworkService, 
   private storage: Storage, 
   private offlineManager: OfflineManagerService) { }


  get_all_list_onbound_details(forceRefresh: boolean = false,obj)  {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('onboard-leads'));
    } else {
          return this.https.post('/api/onboard-leads',obj).pipe(
            map(res => res.json()),
            tap(res => {
              this.setLocalData('onboard-leads', res);
            })
          ) 
    }
  }

  get_all_list_unread_details(forceRefresh: boolean = false,obj) {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('unread'));
    } else {
          return this.https.post('/api/leads',obj).pipe(
            map(res => res.json()),
            tap(res => {
              this.setLocalData('unread', res);
            })
          ) 
    }
  }

  get_all_list_read_details(forceRefresh: boolean = false,objData)  {


    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage   
      return from(this.getLocalData('read'));
    } else {
          return this.https.post('/api/leads',objData).pipe(
            map(res => res.json()),
            tap(res => {
              this.setLocalData('read', res);
            })
          ) 
    }
  }

  set_read_data(objData)  {
    return this.https.post('/api/update-leads-status',objData).pipe(
      map(res => res.json())
    ) 
    
  }
  

    //Save result of API requests
    private setLocalData(key, data) {
      this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
    }
   
    // Get cached API result
    private getLocalData(key) {
      return this.storage.get(`${API_STORAGE_KEY}-${key}`);
    }
}
