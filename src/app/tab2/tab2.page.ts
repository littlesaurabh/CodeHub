import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FirebaseDataService } from "../services/firebase-data.service";

@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.css"],
})
export class Tab2Page implements OnInit {
  errorMsg;
  categories;

  constructor(private router: Router, private fds: FirebaseDataService) {}

  ngOnInit() {
    this.fds.loadingPresent();
    this.fds.getCategoriesData().subscribe(
      (data) => {
        this.categories = data;
        console.log(data)
        this.fds.loadingDismiss();
      },
      (error) => {
        console.log(error);
        this.fds.loadingDismiss();
        this.errorMsg = error;
      }
    );
  }

  cources(c) {
    console.log(c)
    this.router.navigate(["cources"], {
      queryParams: { value: JSON.stringify(c.cources) ,category:c.category
      
      }
      
    });
  }
}
