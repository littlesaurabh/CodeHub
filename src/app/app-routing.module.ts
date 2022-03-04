import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  {
    path:'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
    // loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)

  },
  {
    path:'',
    // loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)

  },
  

  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  // ==================
  {
    path: 'cources',
    loadChildren: () => import('./cources/cources.module').then( m => m.CourcesPageModule)
  },
  {
    path: 'contents',
    loadChildren: () => import('./contents/contents.module').then( m => m.ContentsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'welcome/login',
    redirectTo:"login",
    pathMatch:"full"
  },

   // ========courses page=====================
  {
    path: 'cources/home',
    redirectTo:"tabs/tab/home",
    pathMatch:"full"
  },
  {
    path: 'cources/categories',
    redirectTo:"tabs/tab/categories",
    pathMatch:"full"
  },
  {
    path: 'cources/notifications',
    redirectTo:"tabs/tab/notifications",
    pathMatch:"full"
  },

  // ========contents page=====================
  {
    path: 'contents/home',
    redirectTo:"tabs/tab/home",
    pathMatch:"full"
  },
  {
    path: 'contents/categories',
    redirectTo:"tabs/tab/categories",
    pathMatch:"full"
  },
  {
    path: 'contents/notifications',
    redirectTo:"tabs/tab/notifications",
    pathMatch:"full"
  },

   // ========details page=====================
   {
    path: 'details/home',
    redirectTo:"tabs/tab/home",
    pathMatch:"full"
  },
  {
    path: 'details/categories',
    redirectTo:"tabs/tab/categories",
    pathMatch:"full"
  },
  {
    path: 'details/notifications',
    redirectTo:"tabs/tab/notifications",
    pathMatch:"full"
  },
  
  // {
  //   path: 'welcome/login/Register/login',
  //   // loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  //   redirectTo:"login",
  //   pathMatch:"full"
  // },
  // {
  //   path: 'welcome/register/login',
  //   // loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  //   redirectTo:"lohin",
  //   pathMatch:"full"
  // },
  //  {
  //   path: 'welcome/login/Register',
  //   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'welcome/register',
  //   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'welcome/login/Register',
  //   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  // },
  
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  
 
  // ====================
  // {
  //   path: 'tab1',
  //   loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  // },
  // {
  //   path: 'categories',
  //   loadChildren: () => import('./categories/categories.module').then( m => m.categoriesPageModule)
  // },
  // {
  //   path: 'notifications',
  //   loadChildren: () => import('./notifications/notifications.module').then( m => m.notificationsPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
