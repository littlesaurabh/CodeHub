import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import {Location} from "@angular/common"
import {FirebaseDataService} from "../services/firebase-data.service"


@Component({
  selector: 'app-contents',
  templateUrl: './contents.page.html',
  styleUrls: ['./contents.page.css'],
})
export class ContentsPage implements OnInit {
  
  data
  errorMsg
  courseName
language
  constructor(private activatedRoute:ActivatedRoute,private router: Router,public navCtrl: NavController,private location:Location,private fds:FirebaseDataService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      console.log(params)
      this.courseName=params.json
      this.language=params.language

      this.fds.loadingPresent()
      this.fds.getData(this.courseName+".json")
      .subscribe((data)=> {
                          this.fds.loadingDismiss();
                          this.data=data},
                 (error)=>{
                   console.log(error)
                   this.fds.loadingDismiss();
                    this.errorMsg=error})
      

      console.log(this.data)}
      
      )
      
      
        
     

   
    

  }

  details(c){
   

    this.router.navigate(['/details'],{ queryParams: {
      value : JSON.stringify(c) ,
      
      courseName:this.courseName,
  data:JSON.stringify(this.data)
    }
      });
  }

  goBack() {
    this.location.back();
  }
 
}
