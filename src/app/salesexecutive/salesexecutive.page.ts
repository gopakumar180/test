import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SalesexecutiveService } from '../service/salesexecutive.service'
import { NetworkService, ConnectionStatus } from '../service/network.service';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-salesexecutive',
  templateUrl: './salesexecutive.page.html',
  styleUrls: ['./salesexecutive.page.scss'],
})
export class SalesexecutivePage implements OnInit {

  constructor(private router: Router,
    private SalesexecutiveSrv :SalesexecutiveService,
    private plt: Platform,
    private networkService: NetworkService,
    private toastController: ToastController,) {}
    arrayOnBound : any =[];
    arrayUnRead : any =[];
    arrayRead : any =[];
    objUserData : any ;
    blnFilterBar =false;
   blnSearchresult =true;
   strSelectType='OnBOUND'
  objSearchOnBoundData ={
    dealer_id:'',
    user_id:'',
    status:'',
    offset:'0',
    limit:'10'
  }
  objSearchUnReadData ={
    dealer_id:'',
    user_id:'',
    status:'',
    offset:'0',
    limit:'10'
  }
  objSearchReadData ={
    dealer_id:'',
    user_id:'',
    status:'',
    offset:'0',
    limit:'10'
  }

  objUpdateData ={
    id:'',
    executive_id:'',
    status:''
    
  }
  ngOnInit() {
    this.objUserData =  JSON.parse(localStorage.getItem('userData'));  
    this.plt.ready().then(() => {
      this.initializeApp(true)
     });
  }

  initializeApp(blnFlag = false,refresher?) {
    this.onLoadData(blnFlag);
    // this.onLoadedPopularBikes(blnFlag);
    // this.onLoadedLatestCar(blnFlag);
    // this.onLoadedLatestBikes(blnFlag)
    // this.onLoadedHomeSlider(blnFlag);
  
    setTimeout(() => {
      if (refresher) {
        refresher.target.complete();
      }    
    }, 2000);
  
    
    
  }
  onClickLogOut(){
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    this.router.navigate(['/tabs/tab3']);
  }

   segmentChanged(dataType: any) {
    if(dataType.detail && dataType.detail.value){
      // this.objSearchData.dealer_id ='';
      // this.objSearchData.user_id='';
      // this.objSearchData.status='';
      this.strSelectType  =dataType.detail.value
      this.onLoadData(true)
    }
  }




  onLoadData(refresh = false){
    
    // if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
    //   let toast = this.toastController.create({
    //     message: ` offline.`,
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    //   toast.then(toast => toast.present());
    // }
    // else{
      //localStorage.setItem('objSearchVehicleDetails',  JSON.stringify(this.objSearchData));
      
      this.arrayOnBound=[]
      if(this.objSearchOnBoundData && this.strSelectType =='OnBOUND'){
       
        this.objSearchOnBoundData.dealer_id=this.objUserData.dealer_id;
        this.objSearchOnBoundData.user_id=this.objUserData.id;
        this.objSearchOnBoundData.status='0';
       // this.objSearchOnBoundData.offset ='0';
       // this.objSearchOnBoundData.limit ='10';

        this.SalesexecutiveSrv.get_all_list_onbound_details(refresh,this.objSearchOnBoundData).subscribe((res) => {
          if(res && res.status ==true){
            this.arrayOnBound = res.data;
            this.blnFilterBar =true;
            this.blnSearchresult =false;
          }else {
            this.presentToast(res.message)
          }
         },
         (error) => {
           console.log('error');
         });
      } 
      
      if(this.objSearchUnReadData && this.strSelectType =="UNREAD"){
        this.objSearchUnReadData.dealer_id=this.objUserData.dealer_id;
        this.objSearchUnReadData.user_id=this.objUserData.id;
        
        
        this.objSearchUnReadData.status='0';
        //this.objSearchUnReadData.offset ='0';
       // this.objSearchUnReadData.limit ='10';

        this.SalesexecutiveSrv.get_all_list_unread_details(refresh,this.objSearchUnReadData).subscribe((res) => {
         
          if(res &&res.status ==true){
            this.arrayUnRead = res.data;
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
       if(this.objSearchReadData && this.strSelectType =="VIEW"){
        this.objSearchReadData.dealer_id=this.objUserData.dealer_id;
        this.objSearchReadData.user_id=this.objUserData.id;
        
        this.objSearchReadData.status='1';
        //this.objSearchReadData.offset ='0';
       // this.objSearchReadData.limit ='10';
        this.SalesexecutiveSrv.get_all_list_read_details(refresh,this.objSearchReadData).subscribe((res) => {
          if(res && res.status ==true){
            this.arrayRead = res.data;
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
      
  
 
   }

   async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  onClickRead(data){
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
      let toast = this.toastController.create({
        message: ` offline.`,
        duration: 3000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
    }
    else{

      if(data && data.id && this.objUserData && this.objUserData.id){
        this.objUpdateData.id=data.id;
        this.objUpdateData.executive_id==this.objUserData.id;
        this.objUpdateData.status="1"
        this.SalesexecutiveSrv.set_read_data(this.objUpdateData).subscribe((res) => {
          if(res && res.status ==true){
            this.arrayRead = res.data;
            this.blnFilterBar =true;
            this.blnSearchresult =false;
            data.status='read'
          }else{
            this.presentToast(res.message)
          }
         },
         (error) => {
           console.log('error');
         });
  
      }else{
  
        this.presentToast("Missing Data")
      }
  }
    

  }
}
