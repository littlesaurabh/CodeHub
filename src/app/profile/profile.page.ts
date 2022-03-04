import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user;
  email;
  allet
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {

    this.email = this.afAuth.auth.currentUser.email;

    this.storage
      .get(this.email)
      .then((user) => {
        if (this.email === user.email) {
          this.user = user;
        }
      })
      .catch((error) => {});
  }

  goBack() {
    this.router.navigate(["tabs/tab/categories"]);
  }

  // change Password and Sign out
  changePassword() {
    this.afAuth.auth
    .sendPasswordResetEmail(this.email)
    .then((data) => {
      this.alertAll("Reset password", "Visit your email to recover codeHub password.");

    })
    .catch((err) => {
     
      this.alertAll("failed!", err.message);
      
    });
    this.signout();
  }

  //sign out

  signout() {
    this.afAuth.auth.signOut().then(() => {
      console.log("signout");
      this.storage.remove('currentUser').then((val) => {
        this.router.navigateByUrl("/login");
      });
    });
  }




   //alert

   async alertAll(header: string, message: string) {
    this.allet = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ["Ok"],
    });
    await this.allet.present();
  }

}
