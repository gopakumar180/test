import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModelService} from '../service/model.service'
import { NetworkService, ConnectionStatus } from '../service/network.service';
import { ToastController } from '@ionic/angular';
import {LeadPage } from '../lead/lead.page'
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.page.html',
  styleUrls: ['./detailspage.page.scss'],
})
export class DetailspagePage implements OnInit {
  Id = null;
  @ViewChild('content', { static: false }) content: IonContent;
  public arraySlideData :any;
  public objItemDetails:any;
  public strTypeValue:any;
  public strSelectType :string ='A';
  
  
  objUserData:any;
  objAllDetailsCar : any ;
  objOverview :any;
  objFeatures :any;
  objSpecification :any;
 

  constructor(private router: Router,private activatedRoute: ActivatedRoute,
    private modelSrv: ModelService,
    private networkService: NetworkService,
    private toastController: ToastController,
   // private leadController:LeadPage,
    private modalCtrl:ModalController,
    ) { }
  public objReturData = {
    firstName: 'jamsheed',
    lastName: 'jam',
    middleInitial: 'pk'
  }
  ngOnInit() {
    this.objUserData =  JSON.parse(localStorage.getItem('userData'));
    this.Id = this.activatedRoute.snapshot.paramMap.get('id');
    
   
     this.objItemDetails =  JSON.parse(localStorage.getItem('objItemDetails'));
     this.strTypeValue =  JSON.parse(localStorage.getItem('strType'));
     if(this.objItemDetails && this.strTypeValue =='CAR' && this.Id){
      
        this.getAllDetailsCar(this.Id)
      this.arraySlideData =this.objItemDetails.car_images;
     }
      else if(this.objItemDetails && this.strTypeValue =='BIKE' && this.Id){
      this.arraySlideData =this.objItemDetails.bike_images;
      this.getAllDetailsBike(this.Id)
      }
       

  }
  priceBreakups(){
    this.router.navigate(['/price-breakups']);
  }
  onBackDetails(){
    let strModuleId =  JSON.parse(localStorage.getItem('moduleId')); 
    localStorage.removeItem("strType");
    localStorage.removeItem("objItemDetails");
    this.router.navigate([strModuleId])
   //this.modalCtrl.dismiss(this.objReturData);

  }


  onFeaturesSegmentChanged(dataType: any) {
    if(dataType.detail && dataType.detail.value){
    //   setTimeout(() => {
    //     if (this.content.scrollToTop) {
    //         this.content.scrollToBottom(100);
    //     }
    // }, 600);
      this.strSelectType  = dataType.detail.value
    }
  }

    gotoPriceBreaups(obj, type) {
    
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
      return this.presentToast('You are Offline.')
    }
    else{
      this.router.navigate(['/emi-calculator/'+obj+'/type/'+type]);
    }
    
  }


  async presentModal() {
    
    let strName ='';
    let strPhone ='';
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
      return this.presentToast('You are Offline.')
    }
    else{
      if(this.objUserData){
        strName = this.objUserData.name;
        strPhone = this.objUserData.phone;
      }
      const modal = await this.modalCtrl.create({
        component: LeadPage,
        componentProps: {
          'name': strName,
          'phone': strPhone,
          'middleInitial': 'N'
        }
      });
      return await modal.present();
      
    }
    
  }

  getAllDetailsCar(strId ='') {
   
    this.modelSrv.get_all_details_car(strId).subscribe((res) => {
       
       this.objOverview= res.data.overview;
       this.objFeatures= res.data.features;
       this.objSpecification= res.data.specification;
       
      },
      (error) => {
        console.log('error');
      });
  }

  getAllDetailsBike(strId ='') {
   
    this.modelSrv.get_all_details_bike(strId).subscribe((res) => {
      this.objOverview= res.data.overview;
       this.objFeatures= res.data.features;
       this.objSpecification= res.data.specification;
      },
      (error) => {
        console.log('error');
      });
  }

  onClickAcction(strType){

    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline ) {
    
      this.presentToast('You are Offline.')
    }
    else{
      this.router.navigate(['/lead']);
      var token =  JSON.parse(localStorage.getItem('token'));
    }
   
    // if(token ) {
    //   this.SalesexecutiveSrv.set_read_data(this.objUpdateData).subscribe((res) => {
    //     if(res && res.status ==true){
    //       this.arrayRead = res.data;
    //       this.blnFilterBar =true;
    //       this.blnSearchresult =false;
    //       data.status='read'
    //     }else{
    //       this.presentToast(res.message)
    //     }
    //    },
    //    (error) => {
    //      console.log('error');
    //    });
    // } else{

    //   this.router.navigate(['/tabs/tab3']);
    // }

  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

 

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }
  
           $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
  
           if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
  
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };

}
