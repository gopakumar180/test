import { Injectable } from '@angular/core';
import { HttpClientService } from './common/http-client.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { tap, map, catchError } from "rxjs/operators";
import { Observable, from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService  implements CanActivate{

  constructor(private https: HttpClientService,private router: Router) { }


  
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    let authInfo = JSON.parse(localStorage.getItem("token"));

    if (!authInfo) {
      this.router.navigate(['/tabs/tab3']);
      return false;
    }

    return true;
  }
  
   get_checking_login(objData) {
    return this.https.post('/api/login',objData) .pipe(
      map(res => res.json()),
      catchError(err => {
        throw new Error(err);
      })
    )
  
  }

  // save_register_data(objData):Observable<any[]> {
  //   return this.https.post('/api/register',objData) //post method check 
  //   .map(res => res.json())
  //   .catch(this.https.hamdleError);
  
  // }
save_register_data(objData) {
  
  return this.https.post('/api/register',objData).pipe(
    map(res => res.json()),
    catchError(err => {
      throw new Error(err);
    })
  )
  }

  
}
