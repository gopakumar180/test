import { Component, OnInit,Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModelService} from '../service/model.service'
import {ListService } from '../service/list.service'
import { from } from 'rxjs';
import { Router } from '@angular/router';
import {DetailspagePage} from '../detailspage/detailspage.page'
import { Platform } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-listdata',
  templateUrl: './listdata.page.html',
  styleUrls: ['./listdata.page.scss'],
})

export class ListdataPage implements OnInit {
  // @Input() public data: any;
   objAllPricelimit: any;
   arrayOfAllVehicleDetails :[];
   strTypeVehicle :string='';
   arrayData =['No Data Found'];

  // public objReturData ={
  //   firstName: 'jamsheed',
  //   lastName: 'jam',
  //   middleInitial: 'pk'
  // }
  users = [];
 

 
  constructor(private apiService: ApiService, private plt: Platform,private router: Router,
    private modalCtrl:ModalController,
    private modelSrv: ModelService,
    private listSrv :ListService,
    public loadingController: LoadingController
    ) { 
   }
  
  ngOnInit() {
    this.presentLoading()
    //this.getAllSearchVehicleDetailsData()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  // async presentLoadingWithOptions() {
  //   const loading = await this.loadingController.create({
  //     spinner: null,
  //     duration: 5000,
  //     message: 'Click the backdrop to dismiss early...',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading',
  //     backdropDismiss: true
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed with role:', role);
  // }
  // ngOnInit() {
  //   this.plt.ready().then(() => {
  //     this.loadData(true);
  //   });
  // }

  // loadData(refresh = false, refresher?) {
  //   this.apiService.getUsers(refresh).subscribe(res => {
  //     this.users = res;
  //     if (refresher) {
  //       refresher.target.complete();
  //     }
  //   });
  // }
 
  // updateUser(id) {
  //   this.apiService.updateUser(id, {name: 'Simon', job: 'CEO'}).subscribe();
  // }
  onClickCloseModel() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    // this.modalCtrl.dismiss({
    //   'dismissed': true
    // });
   // this.modalCtrl.dismiss(this.objReturData);
   this.router.navigate(['tabs'])
  
  }

  onClickDetailsData(){
    console.log("herereer")
  }

  // getAllSearchVehicleDetailsData() {
    
  //   let objSearchVehicleDetails =  JSON.parse(localStorage.getItem('objSearchVehicleDetails'));
  //   this.arrayData =['No Data Found'];
  //   if(objSearchVehicleDetails && objSearchVehicleDetails){
  //     this.listSrv.get_all_list_vehicle_details(objSearchVehicleDetails).subscribe((res) => {
  //       if(res && res.length){
  //         this.arrayOfAllVehicleDetails = res;
  //       }
  //      // console.log('arrayData',this.arrayData);  

  //       console.log('arrayOfAllVehicleDetails',this.arrayOfAllVehicleDetails);  
  //      },
  //      (error) => {
  //        console.log('error');
  //      });
  //   }else{
  //     alert('DATA MISSING')
  //   }

    
 
  // }

  async onClickDetailsPage() {
   // console.log('openData ................>>>');
    const modal = await this.modalCtrl.create({
      component: DetailspagePage  
    });
    
    return await modal.present()

  }

  // onClickDetailsPage(item) {
  //   //localStorage.setItem('moduleId',  JSON.stringify('listdata'));
  //  //this.router.navigate(['detailspage'])
  
  // }

}
