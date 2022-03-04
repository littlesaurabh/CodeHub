import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:"/tab/home",
    pathMatch:"full",
  },
  {
    path: 'tab',
    component: TabsPage,
    children:[
    
      {
        path:"home",
        children:[
          {
            path:"",
            // loadChildren:"../tab1/tab1.module#Tab1PageModule"
            loadChildren: () => import('../tab1/tab1.module').then( m => m.Tab1PageModule)
          }
        ]
      },
      {
        path:"categories",
        children:[
          {
            path:"",
            // loadChildren:"../tab2/tab2.module#Tab2PageModule"
            loadChildren: () => import('../tab2/tab2.module').then( m => m.Tab2PageModule)
          }
         
          
        ]
      },
      {
        path:"notifications",
        children:[
          {
            path:"",
            // loadChildren:"../tab3/tab3.module#Tab3PageModule"
            loadChildren: () => import('../tab3/tab3.module').then( m => m.Tab3PageModule)
          }
        ]
      },
      // ==================
     
    

      
      
      // ====================
    ]
  },
  // ========courses page=====================
  // {
  //   path: 'cources/tab1',
  //   redirectTo: '/tab/tab1',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'cources/tab2',
  //   redirectTo: '/tab/tab2',
  //   pathMatch: 'full'
  // }
  // ,{
  //   path: 'cources/tab3',
  //   redirectTo: '/tab/tab3',
  //   pathMatch: 'full'
  // },
  // ========contents page=====================
  // {
  //   path: 'contents/tab1',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'contents/tab2',
  //   redirectTo: '/tabs/tab2',
  //   pathMatch: 'full'
  // },
 
  // {
  //   path: 'contents/tab3',
  //   redirectTo: '/tabs/tab3',
  //   pathMatch: 'full'
  // },

   // ========details page=====================
  //  {
  //   path: 'details/tab1',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'details/tab3',
  //   redirectTo: '/tabs/tab3',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'details/tab2',
  //   redirectTo: '/tabs/tab2',
  //   pathMatch: 'full'
  // }
 
  
     
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
