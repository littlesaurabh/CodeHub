import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FirebaseDataService } from "../services/firebase-data.service";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.css"],
})
export class DetailsPage implements OnInit {
  contents;

  data;
  index: number = 0;
  len;
  item;
  errorMsg;
  code;
  courseName;
  chapterName;
  imageUrl;
  nextDisplay = true;
  backDisplay = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fds: FirebaseDataService,
    private storage: AngularFireStorage
  ) {
    this.route.queryParams.subscribe((res) => {
      this.contents = JSON.parse(res.value);

      this.data = JSON.parse(res.data);
      this.courseName = res.courseName;
      // this.items = this.contents['description']
    });
  }

  ngOnInit() {
    this.item = this.contents["description"][this.index];
  
    this.chapterName = this.contents.chapter;

    // this.loadCode(this.courseName,this.chapterName,this.item[3].value)
    this.loadCurrentItem(this.index);
   

    if (this.contents.description.length == 1) {
      this.nextDisplay = false;
    } else {
      this.nextDisplay = true;
      this.backDisplay = false;
    }
  }

  loadCurrentItem(index) {
    this.item = this.contents["description"][this.index];
    

    if (this.index == this.contents.description.length - 1) {
      this.nextDisplay = false;
      this.backDisplay = true;
    }

    let codeindex = -1;
   
    for (
      let i = 0;
      i < this.contents["description"][this.index].content.length;
      i++
    ) {
      if (this.contents["description"][this.index].content[i].type === "code") {
        codeindex = i;
        break;
      }
    }

 
    if (codeindex != -1) {
      this.loadCode(
        this.courseName,
        this.chapterName,
        this.item.content[codeindex].value
      );
    }

    //for image
    let imageindex = -1;
   
    for (
      let i = 0;
      i < this.contents["description"][this.index].content.length;
      i++
    ) {
  
      if (
        this.contents["description"][this.index].content[i].type === "image"
      ) {
        imageindex = i;
      }
    }
    

    if (imageindex != -1) {
      this.loadImage(
        this.courseName,
        this.chapterName,
        this.item.content[imageindex].value
      );
    }


  }

  nextItem() {
    // if (this.index < this.contents.description.length) {
 

    if (this.index + 2 == this.contents.description.length) {
      this.index++;
      this.loadCurrentItem(this.index);
      this.nextDisplay = false;
   
    } else {
      this.index++;
     
      this.loadCurrentItem(this.index);
      this.nextDisplay = true;
      this.backDisplay = true;
    }

    // }
  }

  backItem() {
    
    if (this.index <= 1) {
      this.index--;
      this.loadCurrentItem(this.index);
      
      this.backDisplay = false;
    } else {
  
      this.index--;
      this.loadCurrentItem(this.index);
      this.backDisplay = true;
      this.nextDisplay = true;
    }
  }

  loadCode(course, chapter, file) {
    this.fds.loadingPresent();
    const path = `${course}/${chapter}/${file}`;
    
    const storageRef = this.storage.ref(path);

    storageRef.getDownloadURL().subscribe(
      (res) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.onload = (e) => {
          this.fds.loadingDismiss();
          this.code = xhr.response;
        };
        xhr.open("GET", res);
        xhr.send();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //load image
  loadImage(course, chapter, file) {
    // this.fds.loadingPresent()
    const path = `${course}/${chapter}/${file}`;
  
    const storageRef = this.storage.ref(path);

    storageRef.getDownloadURL().subscribe(
      (res) => {
        this.imageUrl = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  back(index) {
    this.index = index - 1;
    this.contents = this.data.filter((s) => s.index == this.index)[0];
  }

  next(index) {
    this.index = index + 1;
    this.contents = this.data.filter((s) => s.index == this.index)[0];
  }

  ngOnDistroy(){
    this.fds.loadingDismiss();
  }

  //Editor
//   private getEditor() {
//     const win = window as any;
//     const module = win.google;
    
//       return new Promise((resove, reject) => {
//         const script = document.createElement("script");
//         script.src = "https://pagecdn.io/lib/ace/1.4.11/ace.min.js";
//         script.crossOrigin="anonymous";
//         script.integrity="sha256-qCCcAHv/Z0u7K344shsZKUF2NR+59ooA3XWRj0LPGIQ="
//         // <script src="https://pagecdn.io/lib/ace/1.4.11/ace.min.js" crossorigin="anonymous" integrity="sha256-qCCcAHv/Z0u7K344shsZKUF2NR+59ooA3XWRj0LPGIQ=" ></script>
//         document.body.appendChild(script);
//         script.onload = () => {

         
//           const loadedModule = win.ace;
//           if (loadedModule) {
//             resove(loadedModule);
//           } else {
//             reject("Module not found")
//           }
//         };
//       });
    
//   }

//   ngAfterViewInit(){
//     this.getEditor().then(kuchV=>{
// console.log(kuchV)

//     }).catch(error=>{
//       console.log(error)
//     })
//   }
}
