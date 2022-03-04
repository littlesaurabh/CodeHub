import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

import { AlertController } from "@ionic/angular";

import { Storage } from "@ionic/storage";
import { FirebaseDataService } from "../services/firebase-data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  userLogin: FormGroup;
  user: any;
  allet;
  constructor(
    private storage: Storage,
    private location: Location,
    private formBuilder: FormBuilder,
    public router: Router,
    private afAuth: AngularFireAuth,
    private fds: FirebaseDataService,
   
    private alertCtrl: AlertController
  ) {
    this.userLogin = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9_.]+@[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,3}$"
          ),
        ],
        // Validators.compose([
        //   Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  loginData() {
  
    this.afAuth.auth
      .signInWithEmailAndPassword(
        this.userLogin.value.email,
        this.userLogin.value.password
      )
      .then((res) => {
        if (res.user) {
          console.log(this.afAuth.auth)
          if (this.afAuth.auth.currentUser.emailVerified) {

            console.log(this.userLogin.value)
            this.storage.set("currentUser", this.userLogin.value.email);
            this.fds.login(this.userLogin.value.email)
            this.router.navigate(["tabs/tab/categories"]);
            this.userLogin.reset();
            
          } else {
            this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
              this.alertAll(
                "Email not verified",
                "Visit your email for email verification"
              );
              this.router.navigate(["/login"]);
            });
            this.userLogin.reset();
          }
        }
      })
      .catch((err) => {
        console.log("user not ", err.message);
        this.alertAll("Login failed!", err.message);
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

  





  //  Recover Password

  async recoverPassword() {
    let alert =await this.alertCtrl.create({
      header: 'Recover Password',
      inputs: [
        {
          name: 'email',
          type:'email',
          placeholder: 'Enter your email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Recover Password',
          handler: data => {
            this.afAuth.auth
            .sendPasswordResetEmail(data.email)
            .then((data) => {
              this.alertAll("Reset password", "Visit your email to recover codeHub password.");
      
            })
            .catch((err) => {
             
              this.alertAll("failed!", err.message);
              
            });
            
      
          }
        }
      ]
    });
   alert.present();
  }
}
