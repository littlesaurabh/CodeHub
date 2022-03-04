import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  body:string=""
  subject:string=""
  url
  constructor(private router:Router) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(["tabs/tab/categories"])
  }
  submitfeedback(){
    this.url="mailto:codehubteam@gmail.com?subject="+this.subject+"&body="+this.body
this.body="";
this.subject=""
  }
}
