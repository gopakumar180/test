import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TabsPage} from "./tabs/tabs.page";
import {Tab3Page} from "./tab3/tab3.page";
import {Tab2Page} from "./tab2/tab2.page";
import {Tab1Page} from "./tab1/tab1.page";
import { AuthService } from "./service/auth.service";

const routes: Routes = [
 
  
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'listdata',
    loadChildren: () => import('./listdata/listdata.module').then( m => m.ListdataPageModule)
  },
  {
    path: 'detailspage/:id',
    loadChildren: () => import('./detailspage/detailspage.module').then( m => m.DetailspagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  // },
  {
    path: 'emi-calculator/:id/type/:type',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
    },
 
  {
    path: 'tabs',
    component: TabsPage,
    children: [
        {
            path: 'tab1',
            children: [
                {path: '', component: Tab1Page}
            ]
        },
        {
            path: 'tab2',
            children: [
                {path: '', component: Tab2Page}
            ]
        },
        {
            path: 'tab3',
            children: [
                {path: '', component: Tab3Page}
            ]
        },
        {
            path: '',
            redirectTo: '/tabs/tab1',
            pathMatch: 'full'
        }
    ]
},
  {
    path: 'salesexecutive',
    loadChildren: () => import('./salesexecutive/salesexecutive.module').then( m => m.SalesexecutivePageModule),
    canActivate: [AuthService]
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then( m => m.ManagerPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'lead',
    loadChildren: () => import('./lead/lead.module').then( m => m.LeadPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
