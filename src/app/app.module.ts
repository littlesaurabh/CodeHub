import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
// import {WelcomePage } from './welcome/welcome.page';
// import {AngularFireAuthModule} from "@angular/fire/auth";
// import {AngularFireModule} from "@angular/fire";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "src/environments/environment";
// emailAuth
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule, BUCKET } from "@angular/fire/storage";
// storage
import { IonicStorageModule } from "@ionic/storage";
import { FirebaseDataService } from "./services/firebase-data.service";
import { HttpClientModule } from "@angular/common/http";
// firestore


// import {FCM} from "@ionic-native/fcm";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    BrowserModule,
    HttpClientModule,

    IonicModule
      .forRoot
      // {animated: false}
      (),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
  
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseDataService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: BUCKET, useValue: "codehub-659b2.appspot.com" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
