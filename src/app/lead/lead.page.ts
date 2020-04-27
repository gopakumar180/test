import { Component, OnInit ,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModelService} from '../service/model.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-lead',
  templateUrl: './lead.page.html',
  styleUrls: ['./lead.page.scss'],
})
export class LeadPage implements OnInit {
  @Input() name: string;
  @Input() phone: string;
  @Input() middleInitial: string;

  leadFrom: FormGroup;
  objUpdateData :{
    car_id:1,
    user_id:'',
    name:'',
    phone:'',
    dealer_id:'',
    type:'1'
  }
  constructor(private formBuilder: FormBuilder,
    private modelSrv: ModelService,
    private toastController :ToastController,
    private modalCtrl:ModalController,navParams: NavParams) { 

    this.leadFrom = this.formBuilder.group({
      'txtName': ['', Validators.required],
      'txtPhone' : ['', Validators.compose([Validators.required,Validators.minLength(10)])]
    });
    this.leadFrom.patchValue({txtName: navParams.get('name')});
    this.leadFrom.patchValue({txtPhone: navParams.get('phone')});  
  }
  public objReturData = {
    strName: 'jamsheed',
    strPhoneNo: '99947144955'
  }
  ngOnInit() {
  
  }
  onFormSubmit(data){
    if(data ) {
      this.objUpdateData.name =data.txtPhone;
      this.objUpdateData.phone =data.strPhoneNo;
      this.modelSrv.set_lead(this.objUpdateData).subscribe((res) => {
        if(res && res.status ==true){
          this.presentToast('')
          this.modalCtrl.dismiss();
        } else {
          this.presentToast(res.message)
        }
       },
       (error) => {
         console.log('error');
       });
    } else{
     // this.router.navigate(['/tabs/tab3']);
    }
    console.log("Lead Data is ",data)
  }
  
  onBackDetails(){
    this.modalCtrl.dismiss();
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
