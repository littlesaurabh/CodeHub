import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goBack() {
    
    this.router.navigate(["tabs/tab/categories"])
  }
pancham:boolean=false
saurabh:boolean=false
shashank:boolean=false
kashish:boolean=false
  showdetails(name){
    switch(name){
      case "pancham":{
          this.pancham=true
          this.saurabh=false
          this.shashank=false
          this.kashish=false
          break;
      }
      case "saurabh":{
          this.pancham=false
          this.saurabh=true
          this.shashank=false
          this.kashish=false
          break;
        }
        case "shashank":{
          this.pancham=false
          this.saurabh=false
          this.shashank=true
          this.kashish=false
          break;
        }
        case "kashish":{
          this.pancham=false
          this.saurabh=false
          this.shashank=false
          this.kashish=true
          break;
        }

    }
    
  }
}
