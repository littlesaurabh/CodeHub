import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'


@Component({
  selector: 'app-cources',
  templateUrl: './cources.page.html',
  styleUrls: ['./cources.page.css'],
})
export class CourcesPage implements OnInit {

  constructor(private router:ActivatedRoute,private r:Router) { }
getValue
category
  ngOnInit() {
    
    this.router.queryParams.subscribe((res)=>{
      this.getValue=JSON.parse(res.value)
      this.category=res.category
      console.log(JSON.parse(this.getValue));
  });
 
  }

  loadContent(courses){
    console.log(courses)
    this.r.navigate(["/contents"],{
      
      queryParams:{json:courses.json,language:courses.language}
      
    })
  }

}
