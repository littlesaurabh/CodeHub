import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseDataService } from '../services/firebase-data.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private storage: Storage,private router:Router,private afAuth:AngularFireAuth,private fds:FirebaseDataService) { }

  ngOnInit() {
    
  }
  checkSession(){
    this.storage.get('currentUser').then((user) => {
     this.fds.login(user)
      if(user){

         this.router.navigate(["tabs/tab/categories"])
      }else{
        this.router.navigate(["/login"])
      }
    
    });
  }
}
