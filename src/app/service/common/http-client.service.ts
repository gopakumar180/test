

// @Injectable({
//   providedIn: 'root'
// })

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Http, Headers, Response} from '@angular/http';


import {Observable} from 'rxjs';


@Injectable()
export class HttpClientService {

  private api: string = environment.API_ENDPOINT;

  constructor(private http: Http) { }

  static createAuthorizationHeader(headers: Headers) {


    //const token = JSON.parse(localStorage.getItem('token'));
   // const intModuleId = JSON.parse(localStorage.getItem('moduleId'));
   //const key =JSON.parse("Incarco!!")
  // const token =JSON.parse("ADMMMMM_Incarco!!##")
    //headers.append('params', ' ' + '');
    //headers.append('Authorization', 'bearer ' + '');
    //headers.append('Access-Control-Allow-Origin' , '*');
    //headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    //headers.append('Accept','application/json');
   // headers.append('content-type','application/json');
  }

  /*
  @Function: All Api Post Method Set token in header (Authorization', 'bearer ')
  */
 loginPost(url, data) {
  // console.log('posting:', url, data);
  const headers = new Headers();
  return this.http.post(`${this.api}` + url, data, {headers: headers});
}


  post(url, data) {
    const headers = new Headers();
    //HttpClientService.createAuthorizationHeader(headers);
    return this.http.post(`${this.api}` + url, data, { headers: headers });
  }

/*
  @Function: All Api Get Method Set token in header (Authorization', 'bearer ')
  */
  get(url) {
    const headers = new Headers();
   // HttpClientService.createAuthorizationHeader(headers);
    return this.http.get(`${this.api}` + url, { headers: headers });
  }

  public  hamdleError(response: Response): Observable<any> {
    let errorMessage: any;
    errorMessage = `${response.status} - ${response.statusText}`;
    return Observable.throw('Server Error', errorMessage);
  }
}

