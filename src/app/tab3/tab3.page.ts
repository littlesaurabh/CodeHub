import { Component, OnInit } from '@angular/core';
import { FirebaseDataService } from "../services/firebase-data.service";
// import { FCM } from '@ionic-native/fcm/ngx';
// import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  accordionExapanded=false;
  

notifications
errorMsg

  constructor(private fds: FirebaseDataService) {
  

  }



  ngOnInit() {
    this.fds.loadingPresent();
    this.fds.getNotifications()
 
     .subscribe(
       (data) => {
         this.notifications = data;
         this.fds.loadingDismiss();
       },
       (error) => {
        this.fds.loadingDismiss();
         this.errorMsg = error;
       }
     );

  }



}
