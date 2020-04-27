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
export class ListService {

  private api: string = environment.API_ENDPOINT;
  constructor(private https: HttpClientService,
     private http: Http
    ,private networkService: NetworkService, 
    private storage: Storage, 
    private offlineManager: OfflineManagerService) { }
 

   // VIEW OCCUPATION ITEM
   get_all_list_bick_details(objData) {
    return this.https.post('/api/search-bike',objData) //post method change post-----
    .map(res => res.json())
    .catch(this.https.hamdleError);
  
  }


  get_all_list_car_details(objData) {
    return this.https.post('/api/search-car',objData) //post method change post-----
    .map(res => res.json())
    .catch(this.https.hamdleError);
  
  }



  

  get_all_list_popular_cars_details(forceRefresh: boolean = false):Observable<any[]>  {


    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
    
      return from(this.getLocalData('popular-car'));
    } else {
          return this.https.get('/api/popular-car').pipe(
            map(res => res.json()),
            tap(res => {
              this.setLocalData('popular-car', res);
            })
          )
        // .map(res => res.json())
        // .catch(this.https.hamdleError);
        // tap(res => {
        //   this.setLocalData('popular-car', res);
        // })
      
    }
  }
  

  get_all_list_popular_bikes_details(forceRefresh: boolean = false):Observable<any[]>  {


    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
    
      return from(this.getLocalData('popular-bike'));
    } else {
          return this.https.get('/api/popular-bike').pipe(
            map(res => res.json()),
            tap(res => {
              this.setLocalData('popular-bike', res);
            })
          ) 
    }
  }
  // get_all_list_popular_bikes_details() {
  //   return this.https.get('/api/popular-bike')
  //   .map(res => res.json())
  //   .catch(this.https.hamdleError);
  
  // }

  get_all_list_latest_cars_details(forceRefresh: boolean = false):Observable<any[]>  {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('latest-car'));
    } else {
          return this.https.get('/api/latest-car').pipe(
            map(res => res.json()),
            tap(res => {
              this.setLocalData('latest-car', res);
            })
          )    
    }
  }

  // get_all_list_latest_cars_details() {
  //   return this.https.get('/api/latest-car')
  //   .map(res => res.json())
  //   .catch(this.https.hamdleError);
  
  // }

  get_all_list_latest_bikes_details(forceRefresh: boolean = false):Observable<any[]>  {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('latest-bike'));
    } else {
          return this.https.get('/api/latest-bike').pipe(
            map(res => res.json()),
            tap(res => {
              this.setLocalData('latest-bike', res);
            })
          )    
    }
  }

  // get_all_list_latest_bikes_details() {
  //   return this.https.get('/api/latest-bike')
  //   .map(res => res.json())
  //   .catch(this.https.hamdleError);
  
  // }

  get_all_list_homeslider(forceRefresh: boolean = false):Observable<any[]>  {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('homeslider'));
    } else {
          return this.https.get('/api/homeslider').pipe(
            map(res => res.json()),
            tap(res => {
              this.setLocalData('homeslider', res);
            })
          )    
    }
  }
  // get_all_list_homeslider() {
  //   return this.https.get('/api/homeslider')
  //   .map(res => res.json())
  //   .catch(this.https.hamdleError);
  
  // }

  
  // getSearchVehicleDetails(user, data): Observable<any> {
  //   let url = `${this.api}/api/latest-bike`;
  //   if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
  //     return from(this.offlineManager.storeRequest(url, 'PUT', data));
  //   } else {
  //     return this.http.put(url, data).pipe(
  //       catchError(err => {
  //         this.offlineManager.storeRequest(url, 'PUT', data);
  //         throw new Error(err);
  //       })
  //     );
  //   }
  // }

   //Save result of API requests
   private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
 
  // Get cached API result
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }
  
}
