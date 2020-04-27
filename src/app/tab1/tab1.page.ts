import { Component } from '@angular/core';
import { Router } from '@angular/router';
 import { ListdataPage} from '../listdata/listdata.page'
import { ModelService} from '../service/model.service'

import {ListService } from '../service/list.service'
import { NetworkService, ConnectionStatus } from '../service/network.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // strSelectValue : String ='5L-10L';
  // strSelectBranchValue : String = 'null'
  // strSelectModelValue : String = 'null'
   strType : string ='car'
   blnFilterBar =false;
   blnSearchresult =true;
   objSearchData ={
    budget_id:'',
    brand_id:'',
    model_id:'',
    strSelectType:'car'
  }
  public objData= {
    firstName: 'Douglas',
    lastName: 'Adams',
    middleInitial: 'N'
  }
   objAllPricelimitCar: any;
   objAllBrandsCar: any;
   objAllModelsCar: any;

   objAllPricelimitBike: any;
   objAllBrandsBike: any;
   objAllModelsBike: any;
   arrayOfAllVehicleDetails :[];
  
  public arrayListOfData =['Input','Toggle','Radio','Checkbox','Item','secondary','primary','start','end','toolbar','collapse','boolean false'];

  public objReturData : string;
  frmSearchDetails: FormGroup;
  constructor(private router: Router,
    private modelSrv: ModelService,
    private listSrv :ListService,
    private networkService: NetworkService,
    private toastController: ToastController,
    private menu: MenuController
    // private fb: FormBuilder
    ) {
      
      
    }

    
    customAlertOptions: any = {
      header: 'Prize Level',
      //subHeader: 'Select your Price Limit',
      //message: '....',
      translucent: true
    };
  
    customPopoverOptions: any = {
      header: 'Brand',
      subHeader: 'Select Your Brand',
      message: 'Only select your Brand '
    };
  
    customActionSheetOptions: any = {
      header: 'Model',
      subHeader: 'Select your Model '
    };
  ngOnInit() {
    // this.frmSearchDetails = this.fb.group({
    //   'cmbModelData': [],
    // });
    this.getAllPricelimitCar()
    this.getAllBrandCar();
    this.getAllModelsCar();

    this.getAllPricelimitBike()
    this.getAllBrandBike();
    this.getAllModelsBike();
 

  }
   
 
  
  

  


  // async onSearchButtonClick() {
   
  //   const modal = await this.modalController.create({
  //     component: ListdataPage,
  //     componentProps:{
  //       data :this.arrayListOfData
  //     } 
        
  //   });
  //   modal.onWillDismiss().then(datReturned=>{
  //     this.objReturData =datReturned.data;
  //     console.log("Receved data ...",this.objReturData)
  //   })
  //   return await modal.present().then(_=>{
  //     console.log("send data ...",this.arrayListOfData)
  //   });

  // }

  // async openData() {
  //   console.log('openData ................>>>');
  //   const modal = await this.modalController.create({
  //     component: ListdataPage  
  //   });
    
  //   return await modal.present()

  // }
  getAllPricelimitCar() {
    this.modelSrv.get_all_price_limit_car().subscribe((res) => {
       this.objAllPricelimitCar = res[0];
      },
      (error) => {
        console.log('error');
      });
  }
  getAllPricelimitBike() {
    this.modelSrv.get_all_price_limit_bike().subscribe((res) => {
       this.objAllPricelimitBike = res[0];
      },
      (error) => {
        console.log('error');
      });
  }

  getAllBrandCar() {
    this.modelSrv.get_all_brands_car().subscribe((res) => {
       this.objAllBrandsCar = res.data;
      },
      (error) => {
        console.log('error');
      });
  }
  getAllBrandBike() {
    this.modelSrv.get_all_brands_bike().subscribe((res) => {
       this.objAllBrandsBike = res.data;
      },
      (error) => {
        console.log('error');
      });
  }

  getAllModelsCar(strId ='') {
    this.modelSrv.get_all_model_car(strId).subscribe((res) => {
       this.objAllModelsCar = res.data;
      },
      (error) => {
        console.log('error');
      });
  }
  
  getAllModelsBike(strId ='') {
    this.modelSrv.get_all_model_bike(strId).subscribe((res) => {
       this.objAllModelsBike = res.data;
      },
      (error) => {
        console.log('error');
      });
  }


  onChangeModelData(dataModel: any) {
   
    if(dataModel.detail && dataModel.detail.value){
      this.objSearchData.model_id =dataModel.detail.value
    }
  }

  onChangeBranchData(dataBranch: any) {
    
    if(dataBranch.detail && dataBranch.detail.value){ 
      this.objSearchData.brand_id  =dataBranch.detail.value
      this.objSearchData.model_id='null';
      if(this.objSearchData.strSelectType == 'car'){
        this.getAllModelsCar(dataBranch.detail.value)
      }else{
        this.getAllModelsBike(dataBranch.detail.value)
      }
     
      
      
      
    }
    
 
  }

  onChangePriceLimitData(dataPrice: any) {
   
    
    if(dataPrice.detail && dataPrice.detail.value){   
      this.objSearchData.budget_id  =dataPrice.detail.value
    }
  }


  segmentChanged(dataType: any) {
    
    if(dataType.detail && dataType.detail.value){
      this.objSearchData.budget_id ='5L-10L';
      this.objSearchData.brand_id='';
      this.objSearchData.model_id='';
      this.objSearchData.strSelectType  =dataType.detail.value
    }
  }


  onSearchButtonClick(){
    
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
      let toast = this.toastController.create({
        message: ` offline.`,
        duration: 3000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
    }
    else{
      //localStorage.setItem('objSearchVehicleDetails',  JSON.stringify(this.objSearchData));
      
      this.arrayOfAllVehicleDetails=[]
      if(this.objSearchData && this.objSearchData.strSelectType =='car'){
       
        this.listSrv.get_all_list_car_details(this.objSearchData).subscribe((res) => {
          if(res.status ==true ){
            this.arrayOfAllVehicleDetails = res.data;
            this.blnFilterBar =true;
            this.blnSearchresult =false;
          }else {
            this.presentToast(res.message)
          }
         },
         (error) => {
           console.log('error');
         });
      } else  if(this.objSearchData && this.objSearchData.strSelectType =='bick'){
        this.listSrv.get_all_list_bick_details(this.objSearchData).subscribe((res) => {
          if(res.status ==true){
            this.arrayOfAllVehicleDetails = res.data;
            this.blnFilterBar =true;
            this.blnSearchresult =false;
          }else{
            this.presentToast(res.message)
          }
         },
         (error) => {
           console.log('error');
         });
      }
      //this.router.navigate(['listdata'])
    }
     
      
     
    //  this.listSrv.get_all_list_vehicle_details(this.objSearchData).subscribe((res) => {
    //   this.arrayOfAllVehicleDetails = res.data;
    //   this.router.navigate(['listdata'])
    //  },
    //  (error) => {
    //    console.log('error');
    //  });
 
   }

   onClickCloseModel(){
    this.arrayOfAllVehicleDetails=[];
    this.blnFilterBar =false;
    this.blnSearchresult =true;
   }
   
   onClickLogOut(){
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    this.router.navigate(['login/'])
   }
 
   onClickDetailsPage(objItemDetails: any,strType :any) {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
      let toast = this.toastController.create({
        message: ` You are offline.`,
        duration: 3000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
    }
    else{
      localStorage.setItem('strType',  JSON.stringify(strType));
      localStorage.setItem('moduleId',  JSON.stringify('tabs/tab1'));
      localStorage.setItem('objItemDetails',  JSON.stringify(objItemDetails));
      this.router.navigate(['detailspage/'+objItemDetails.id])
    }
   
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
