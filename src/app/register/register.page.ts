import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registeredData: FormGroup

  allet
  constructor(private location: Location,
     private formBuilder: FormBuilder,
      public router: Router,
    public afAuth: AngularFireAuth,
     private alert: AlertController,
  private storage:Storage
   

  ) { }



  ngOnInit() {
    this.registeredData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]]
    })

  }


  goBack() {
    this.location.back();
  }

  registere() {

    if (this.registeredData.value.password !== this.registeredData.value.cpassword) {
      this.alertAll("Failed!", "Passwords don't match")
    }
    else {

     



// working==============================
      
        this.afAuth.auth.createUserWithEmailAndPassword(this.registeredData.value.email,this.registeredData.value.password).then((res) => {
         
        if(res.user){
          
          this.afAuth.auth.currentUser.sendEmailVerification().then(()=>{
            this.storage.set(this.registeredData.value.email, this.registeredData.value);
            this.alertAll("Verify Email","Visit your email for email verification")   
            this.router.navigate(["/login"])
          })
        
          
        }
         
        }).catch(err=>{
          this.alertAll("failed",err.message)
        })

      }
     
    }


  

  // SendVerificationMail() {
  //   console.log(this.afAuth.auth.currentUser)
  //  return this.afAuth.auth.currentUser.sendEmailVerification()
  //     .then(() => {
  //       this.alertAll("Email Verification", "visit your email for email Verification")
        
  //       this.router.navigateByUrl("/login");
        
  //     })
  // }


  async alertAll(header: string, message: string) {
    this.allet = await this.alert.create(
      {
        header: header,
        message: message,
        buttons: ['Ok']
      })
    await this.allet.present()
  }

}
