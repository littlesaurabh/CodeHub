import { Component, OnInit } from "@angular/core";
import { FirebaseDataService } from "../services/firebase-data.service";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-tab1",
  templateUrl: "./tab1.page.html",
  styleUrls: ["./tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  // tnq=[{tipsTitle:"Tips Of the day",tips:"This is the dummy text for Tips of the day"},{quizTitle:"Quiz of the day",quiz:"This is the dummy text for Quiz of the day"}]
  errorMsg;

  tipsTitle;
  tips;

  quizTitle;
  quiz;
  options;
  answer;
  explaination;
  correctAns = null;
  warning=null
  wrongeAns = null;
  ans=null;
  viewExplainationBtn: boolean = false;
  viewExplaination: boolean = false;
  radioColor: string = "primary";

  constructor(
    private fds: FirebaseDataService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.fds.loadingPresent();
    this.fds.getTipsQuiz().subscribe(
      (data) => {
        this.tipsTitle = data[0].tipsTitle;
        this.tips = data[0].tips;

        this.quizTitle = data[1].quizTitle;
        this.options = data[1].options;
        this.answer = data[1].answer;
        this.explaination = data[1].explaination;
        this.quiz = data[1].quiz;
        this.fds.loadingDismiss();
      },
      (error) => {
        this.fds.loadingDismiss();
        this.errorMsg = error;
      }
    );
  }

  // check Answere
  checkAns() {
    console.log(this.ans);
    if (this.answer === this.ans) {
          this.wrongeAns = null;
          this.warning=null;
          this.correctAns = "Correct Answer";
          this.viewExplainationBtn = true;
          this.radioColor = "success";
    } else if (this.ans === null) {
          this.correctAns = null;
          this.wrongeAns=null;
          this.warning = "Please select your option";
          this.radioColor = "danger";
    } else {
          this.correctAns = null;
          this.warning=null;
          this.wrongeAns = "Wrong Answer Try Again!!!";
          this.viewExplainationBtn = true;
          this.radioColor = "danger";
    }

    this.viewExplaination = false;
  }

  explainationShow() {
    this.viewExplaination = true;
    this.viewExplainationBtn = false;
    // this.correctAns=null
    // this.wrorngeAns=null
  }
  setColor() {
    this.radioColor = "primary";
  }

  //load code
  // loadCode(course, chapter, file) {
  //   const path = `${course}/${chapter}/${file}`;
  //   console.log(path);
  //   const storageRef = this.storage.ref(path);

  //   storageRef.getDownloadURL().subscribe(
  //     (res) => {
  //       let xhr = new XMLHttpRequest();
  //       xhr.responseType = "text";
  //       xhr.onload = (e) => {
  //         this.code = xhr.response;
  //       };
  //       xhr.open("GET", res);
  //       xhr.send();
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
