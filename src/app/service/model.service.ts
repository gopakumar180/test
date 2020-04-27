import { Injectable } from '@angular/core';
import { HttpClientService } from './common/http-client.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class ModelService {

  constructor(private https: HttpClientService, private http: Http) { }


  // VIEW OCCUPATION ITEM
  get_all_price_limit_car() {
    return this.https.get('/api/car-budget')
      .map(res => res.json())
      .catch(this.https.hamdleError);

  }

  get_all_price_limit_bike() {
    return this.https.get('/api/bike-budget')
      .map(res => res.json())
      .catch(this.https.hamdleError);

  }


  get_all_brands_car() {
    return this.https.get('/api/car-brands')
      .map(res => res.json())
      .catch(this.https.hamdleError);

  }
  get_all_brands_bike() {
    return this.https.get('/api/bike-brands')
      .map(res => res.json())
      .catch(this.https.hamdleError);

  }

  get_all_model_car(strId) {
    let url = '/api/car-brands'
    if (strId)
      url = `/api/car-models-by-brand/${strId}`;
    return this.https.get(url)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }

  get_all_model_bike(strId) {
    let url = '/api/bike-models'
    if (strId)
      url = `/api/bike-models-by-brand/${strId}`;
    return this.https.get(url)
      .map(res => res.json())
      .catch(this.https.hamdleError);

  }
  getCarVarient(modelId) {
    let url = `/api/car-variants-by-model/${modelId}`;
    return this.https.get(url)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  getCarModel(modelId) {
    let url = `/api/car-models-by-brand/${modelId}`;
    return this.https.get(url)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  brandDetails(type) {
    if (type === 'CAR') {
      let url = `/api/car-brands`;
      return this.https.get(url)
        .map(res => res.json())
        .catch(this.https.hamdleError);
    } else {
      let url = `/api/bike-brands`;
      return this.https.get(url)
        .map(res => res.json())
        .catch(this.https.hamdleError);
    }
  }
  // details for emailcalculator Start
  emi_details_bike(strId) {
    let url = `/api/bike-price-break-up/${strId}`;
    return this.https.get(url)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }

  emi_details_car(strId) {
    let url = `/api/car-price-break-up/${strId}`;
    return this.https.get(url)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }
  // details for emailcalculator End

  get_all_details_bike(strId) {
    let url = `/api/bike-detail/${strId}`;
    return this.https.get(url)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }

  get_all_details_car(strId) {
    let url = `/api/car-detail/${strId}`;
    return this.https.get(url)
      .map(res => res.json())
      .catch(this.https.hamdleError);

  }

  // get_all_price_limit() {
  //   return this.http.get('http://ionic.io',{},{})
  //   .then(data => {

  //     console.log(data.status);
  //     console.log(data.data); // data received by server
  //     console.log(data.headers);

  //   })
  //   .catch(error => {

  //     console.log(error.status);
  //     console.log(error.error); // error message as string
  //     console.log(error.headers);

  //   });

  // }
  set_lead(objData) {
    let url = `api/store-lead`;
    return this.https.post(url, objData)
      .map(res => res.json())
      .catch(this.https.hamdleError);
  }


  funCalculate() {
    console.log('herrrererere then data ');
  }

}
