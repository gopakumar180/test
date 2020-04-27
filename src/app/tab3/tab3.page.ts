import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {AuthService} from '../service/auth.service';
import {NavController} from "@ionic/angular";
import { NetworkService, ConnectionStatus } from '../service/network.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // constructor(private router: Router,) {}
  


  // onClickLogOut(){
  //   localStorage.removeItem("userData");
  //   localStorage.removeItem("token");
  //   this.router.navigate(['login/'])
  //  }

  obj =[];
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController,
    private networkService: NetworkService,
     public navCtrl: NavController) { }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        'email': ['', Validators.compose([Validators.maxLength(70), 
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        'password' : [null, Validators.compose([Validators.required,Validators.minLength(8)])]
      });
    }

    onFormSubmit(objValue) {
      if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
        this.presentToast('You are  Offline')
      } else {
        this.authService.get_checking_login(objValue)
        .subscribe(res  => {
          if (res && res.status =='true' && res.data && res.token) {
              localStorage.setItem('userData',  JSON.stringify(res.data));
              localStorage.setItem('token',  JSON.stringify(res.token));
              if(res.data.role == 'user'){
                this.router.navigate(['/tabs/tab1']);
              } else if(res.data.role == 'manager'){
                this.router.navigate(['/manager']);
              }  else if(res.data.role == 'salesexecutive'){
                this.router.navigate(['/salesexecutive']);
              }
              
              this.presentToast(res.message )                  
          }else{
            if(res && res.status =='true')
              this.presentToast('Warning : Data missing' )
            else
              this.presentToast('Error :' +res.message)
          }
        }, (err) => {
          console.log(err);
        });
      }
      
    }
  
    register() {
      this.router.navigate(['register']);
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
