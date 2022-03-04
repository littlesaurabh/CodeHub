import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { FirebaseDataService } from "./services/firebase-data.service";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

  const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
email
allet
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Profile',
      url: 'profile',
      icon: 'person'
    },
    // {
    //   title: 'Login',
    //   url: 'login',
    //   icon: 'log-in'
    // },
    // {
    //   title: 'Favorites',
    //   url: '/folder/Favorites',
    //   icon: 'heart'
    // },
    // {
    //   title: 'Archived',
    //   url: '/folder/Archived',
    //   icon: 'archive'
    // },
    // {
    //   title: 'Log out',
    //   url: '/folder/Trash',
    //   icon: 'power'
    // },
    {
      title: 'Feedback',
      url: 'feedback',
      icon: 'help-circle'
    },
    {
      title: 'About us',
      url: 'aboutus',
      icon: 'people'
    }

  ];
  // public labels = [{"icon":"settings","labels":"Setting"},{"icon":"help-circle","labels":"Feedback"},{"icon":"power","labels":"Log out"}];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private afAuth:AngularFireAuth,
    private storage: Storage,
    private fds: FirebaseDataService,
    private alertCtrl: AlertController
  ) {
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
     
      
      this.router.navigateByUrl('welcome')
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  ngOnInit() {
// this.email=this.afAuth.auth.currentUser.email
this.email=this.fds.email
console.log(this.email)
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }




    // push Notification

    console.log('Initializing HomePage');
     // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        // alert('Push registration success, token: ' + token.value);
        
        console.log('Push registration success, token: ' + token.value)
      }
    );
     // Some issue with our setup and push will not work
     PushNotifications.addListener('registrationError',
     (error: any) => {
      //  alert('Error on registrati ' + JSON.stringify(error));
       
     }
   );
   // Show us the notification payload if the app is open on our device
   PushNotifications.addListener('pushNotificationReceived',
   (notification: PushNotification) => {
    // alert('Push received: ' + JSON.stringify(notification));
     
    this.alertAll(
      notification.title,
      notification.body
    );
   }
 );

 // Method called when tapping on a notification
 PushNotifications.addListener('pushNotificationActionPerformed',
 (notification: PushNotificationActionPerformed) => {
  //  alert('Push action performed: ' + JSON.stringify(notification));
 }
);



  }






  signout(){
    
     this.afAuth.auth.signOut().then(()=>{
      console.log("signout")
      this.storage.remove('currentUser').then((val)=>{
        this.router.navigateByUrl("/login");
      })
      
     }).catch(error=>{
       console.log("An error happened.")
     })

     
    
  }


  async alertAll(header: string, message: string) {
    this.allet = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ["Ok"],
    });
    await this.allet.present();
  }
}
