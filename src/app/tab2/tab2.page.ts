import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ListService } from '../service/list.service'
import { Platform } from '@ionic/angular';
import { NetworkService, ConnectionStatus } from '../service/network.service';
import { ToastController } from '@ionic/angular';
// import { ModalController } from '@ionic/angular';

import {DetailspagePage} from '../detailspage/detailspage.page'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
 
  arrayPopularCars :any;
  arrayPopularBikes :any;
  arrayLatestCars :any;
  arrayLatestBikes :any;
  arraySlide :any;
  strImagUrl :string ='assets/img/'
 
  constructor(private router: Router,
    private plt: Platform,
    private listSrv :ListService,
    private networkService: NetworkService,
    private toastController: ToastController
    ) {
  }



 

  ngOnInit() {
    this.plt.ready().then(() => {
     this.initializeApp(true)
    });
    
   
   
   
  }

  initializeApp(blnFlag = false,refresher?) {
    this.onLoadedPopularCar(blnFlag);
    this.onLoadedPopularBikes(blnFlag);
    this.onLoadedLatestCar(blnFlag);
    this.onLoadedLatestBikes(blnFlag)
    this.onLoadedHomeSlider(blnFlag);
  
    setTimeout(() => {
      if (refresher) {
        refresher.target.complete();
      }    
    }, 2000);
  
    
    
  }
  onCategoryChange(ev: any) {
    console.log('Segment changed', ev.detail.value);
  }
  onOptionTypeChange(ev: any) {
    console.log('Segment changed', ev.detail.value);
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
      localStorage.setItem('moduleId',  JSON.stringify('tabs/tab2'));
      localStorage.setItem('objItemDetails',  JSON.stringify(objItemDetails));
      this.router.navigate(['detailspage/'+objItemDetails.id])
    }
   
  }

 
  onTestClick(){
    localStorage.setItem('moduleId',  JSON.stringify('tabs/tab2'));
    this.router.navigate(['detailspage'])
  }
  onClickLogOut(){
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    this.router.navigate(['login/'])
   }

 
  onLoadedPopularCar(refresh = false){
   
    this.listSrv.get_all_list_popular_cars_details(refresh).subscribe((res) => {
      this.arrayPopularCars = res; 
     },
     (error) => {
       console.log('error');
     });
  }

  onLoadedPopularBikes(refresh = false){
   
    this.listSrv.get_all_list_popular_bikes_details(refresh).subscribe((res) => {
      this.arrayPopularBikes = res; 
      
     },
     (error) => {
       console.log('error');
     });
  }


  onLoadedLatestCar(refresh = false){
   
    this.listSrv.get_all_list_latest_cars_details(refresh).subscribe((res) => {
        this.arrayLatestCars = res;   
      
      
     },
     (error) => {
       console.log('error');
     });
  }


  onLoadedLatestBikes(refresh = false){
   
    this.listSrv.get_all_list_latest_bikes_details(refresh).subscribe((res) => {
      this.arrayLatestBikes = res;  
    
   },
   (error) => {
     console.log('error');
   });
  }

  onLoadedHomeSlider(refresh = false){
   
    this.listSrv.get_all_list_homeslider(refresh).subscribe((res) => {
      this.arraySlide = res;   
    
        
   },
   (error) => {
     console.log('error');
   });
  }

  
  // async onClickDetailsPage() {
  //   console.log('openData ................>>>');
  //   const modal = await this.modalController.create({
  //     component: DetailspagePage  
  //   });
    
  //   return await modal.present()

  // }

   slideOpts = {
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    on: {
      beforeInit: function() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };
  
        this.params = Object.assign(this.params, overwriteParams);
        this.originalParams = Object.assign(this.originalParams, overwriteParams);
      },
      setTranslate: function() {
        const swiper = this;
        const {
          $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: `${swiperWidth}px` });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }
  
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + (round * 4 * swiperSize);
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = (3 * swiperSize) + (swiperSize * 4 * round);
          }
          if (rtl) {
            tx = -tx;
          }
  
           if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }
  
           const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
          if (progress <= 1 && progress > -1) {
            wrapperRotate = (slideIndex * 90) + (progress * 90);
            if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
          }
          $slideEl.transform(transform$$1);
          if (params.slideShadows) {
            // Set shadows
            let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`,
        });
  
         if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
          } else {
            const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
            const multiplier = 1.5 - (
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
              + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
            );
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset$$1 = params.shadowOffset;
            $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
          }
        }
  
        const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
        $wrapperEl
          .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
      },
      setTransition: function(duration) {
        const swiper = this;
        const { $el, slides } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    }
  }
}
