import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NetworkService, ConnectionStatus } from '../service/network.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../service/model.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  emiForm: FormGroup;
  obj = [];
  loaded: boolean = false;
  parmsId: any;
  parmsType: any;
  objectDetails: any;
  intrest_rate: any = 100;
  period: any = 0;
  down_payment: any = 0;
  emiValues = [{ 'intrest_rate': '', 'period': '', down_payment: '' }];
  emi_type = 'on_road';
  allBrands: any;
  allCarModels: any;
  allCarVarient: any;
  brandId: any;
  modelId: any;

  months = [
    {
      id: 1,
      value: 12,
      title: '12 Months'
    },
    {
      id: 2,
      value: 24,
      title: '24 Months'
    },
    {
      id: 1,
      value: 36,
      title: '36 Months'
    },
    {
      id: 1,
      value: 48,
      title: '48 Months'
    },
    {
      id: 1,
      value: 60,
      title: '60 Months'
    },
    {
      id: 1,
      value: 72,
      title: '72 Months'
    },

  ];

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modelSrv: ModelService,
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController,
    private networkService: NetworkService, ) { }

  ngOnInit() {
    this.parmsId = this.activatedRoute.snapshot.paramMap.get('id');
    this.parmsType = this.activatedRoute.snapshot.paramMap.get('type');
    this.brandDetails();
    if (this.parmsType === 'CAR') {
      this.getAllDetailsCar(this.parmsId);
    } else if (this.parmsType === 'BIKE') {
      this.getAllDetailsBike(this.parmsId);

    }
    // this.registerForm = this.formBuilder.group({
    //   'name': [null, Validators.required],
    //   'email': ['', Validators.compose([Validators.maxLength(70),
    //   Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
    //   'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
    //   'phone': [null, Validators.compose([Validators.required, Validators.minLength(10)])]

    // });

    this.emiForm = this.formBuilder.group({
      'interest_rate': [null],
      'period': [null],
      'down_payment': [null],
      'gender': [null],
      'emi_type': [null],
      'brandId': [null],
      'modelId': [null],
      'varientId': [null]

    });


  }

  getModels(modelId) {
    this.modelSrv.getCarModel(modelId).subscribe((res) => {
      this.allCarModels = res.data;
      if(modelId) {
        this.emiForm.patchValue({
          modelId: this.objectDetails.model_id,
        });
      }
    },
      (error) => {
        console.log('error');
      });
  }
  getVarient(varientID) {
    this.modelSrv.getCarVarient(varientID).subscribe((res) => {
      this.allCarVarient = res.data;
      if (varientID) {
        this.emiForm.patchValue({
          varientId: this.objectDetails.car_id,
        });
      }
    },
      (error) => {
        console.log('error');
      });
  }
  //Brand Details

  brandDetails() {
    this.modelSrv.brandDetails(this.parmsType).subscribe((res) => {
      this.allBrands = res.data;
    },
      (error) => {
        console.log('error');
      });
  }


  //Bike Details
  getAllDetailsBike(strId = '') {
    this.modelSrv.emi_details_bike(strId).subscribe((res) => {
      this.loaded = true;
      this.objectDetails = res.data;
    },
      (error) => {
        console.log('error');
      });
  }
  //Car Details
  getAllDetailsCar(strId = '') {
    this.modelSrv.emi_details_car(strId).subscribe((res) => {
      this.loaded = true;
      this.objectDetails = res.data;
      if (this.objectDetails.brand_id && this.objectDetails.model_id) {
        this.getModels(this.objectDetails.brand_id);
        this.getVarient(this.objectDetails.model_id);
      }
      console.log(res.data);
    },
      (error) => {
        console.log('error');
      });
  }
  onEmiType(obj) {
    this.emi_type = obj.emi_type;
    this.calclulateValue(this.intrest_rate, this.period, this.down_payment, this.emi_type);
  }
  onDownPaymentChange(obj) {
    this.down_payment = obj.down_payment;
    this.calclulateValue(this.intrest_rate, this.period, this.down_payment, this.emi_type);
  }

  // Change Intrest values
  onIntrestChange(val: any) {
    this.intrest_rate = val.interest_rate;
    this.calclulateValue(this.intrest_rate, this.period, this.down_payment, this.emi_type);
  }

  // month change
  onMonthChange(obj) {
    this.period = obj.period;
    this.calclulateValue(this.intrest_rate, this.period, this.down_payment, this.emi_type);
  }
  //Calculate values
  calclulateValue(i_value: any, p_value: any, d_value: any, t_value: any) {
    let reOfIntrest = (i_value) / (12 * 100);

    if (t_value === 'on_road') {


      let emi = ((d_value * reOfIntrest) * Math.pow((1 + reOfIntrest), p_value)) / ((1 + Math.pow((1 + reOfIntrest), p_value) - 1));
      console.log('emi', emi);
    } else if (t_value === 'ex_showroom') {

    }
  }



  onFormSubmit(objValue) {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      this.presentToast('You are  Offline')
    } else {
      this.authService.save_register_data(objValue).subscribe(res => {

        if (res && res.status == 'true') {
          this.presentToast('Data has been saved successfully')
          this.registerForm.reset();
          this.router.navigate(['/tabs/tab3']);
        } else {
          this.presentToast('Wrning:Data missing or email has already been taken')
        }
        //localStorage.setItem('token', res.token);
        //this.router.navigate(['tabs']);

      }, (err) => {
        this.presentToast('Error:Transaction faild')
        console.log(err);
      });
    }

  }


  onClickBackButton() {
    // this.router.navigate(['login']);
    this.router.navigate(['/tabs/tab3']);
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
