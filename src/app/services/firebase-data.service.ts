import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LoadingController } from "@ionic/angular";
// import { catch } from "rxjs/operators";
// import "rxjs/add/operator/catch"
// import "rxjs/add/operator/throw"
import { catchError, map } from "rxjs/operators";

// import { Categories } from '../tab2/categories';

@Injectable({
  providedIn: "root",
})
export class FirebaseDataService {
  data_url = "https://codehub-659b2.firebaseio.com/";
  categories_url = "https://codehub-659b2.firebaseio.com/categories.json";
  notifications_url = "https://codehub-659b2.firebaseio.com/notifications.json";
  tipsnQuiz_url="https://codehub-659b2.firebaseio.com/tipsnQuiz.json";
  isLoading = false;
email
  // tipsnQuiz = [
  //   {
  //     tipsTitle: "Tips Of The Day",
  //     tips:
  //       "Always get someone else to look at your code. It may turn out that your assumptions are purely your own! ",
  //   },
  //   {
  //     quizTitle: "Quiz Of The Day",
  //     quiz: "This is the Dummy text for Quiz of the day.",
  //     options: ["66", "2", "40", "error"],
  //     answere: "2",
  //     explaination:
  //       "cc is initially assigned to 2. The if False statement evaluates to False, so the cc = 66 reassignment never takes place. The reassignment inside the helmet() function does take place, but in the local scope, not the global scope. When the cc variable is accessed in the global scope, the value remains unchanged at 2.",
  //   },
  // ];

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController
  ) {}

  // get categories
  getCategoriesData(): Observable<any> {
    return this.http.get<any>(this.categories_url).pipe(
      map((data) => {
        return data;
      }),

      catchError(this.errorHandler)
    );
  }

  // load code
  loadCodeFile(code_url) {
    let header = new HttpHeaders().set("Content-Type", "");
    header = header.set("Accept", "*/*");
    return this.http.get(code_url, { headers: header });
  }

  // get deta
  getData(fileName): Observable<any> {
    return this.http.get<any>(this.data_url + fileName).pipe(
      // eg. "map" without a dot before
      map((data) => {
        return data;
      }),

      catchError(this.errorHandler)
    );
  }

  //get tips & quiz
  getTipsQuiz() : Observable<any> {
    return this.http.get<any>(this.tipsnQuiz_url)
    .pipe(
      // eg. "map" without a dot before
      map((data) => {
        
        return data;
      }),

      catchError(this.errorHandler)
    );
  }

  // get Notifications
  getNotifications(): Observable<any> {
    return this.http.get<any>(this.notifications_url).pipe(
      // eg. "map" without a dot before
      map((data) => {
        return data;
      }),

      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
  
    return throwError(error.statusText || "server error");
  }

  //spinner

  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: "Loading ...",
        spinner: "bubbles",
      })
      .then((a) => {
        a.present().then(() => {
          console.log("loading presented");
          if (!this.isLoading) {
            a.dismiss().then(() => console.log("abort laoding"));
          }
        });
      });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log("loading dismissed"));
  }



  //login

  login(email){
this.email=email;
console.log("user service",email)
  }
 
}
