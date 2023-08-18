import {Component, OnInit} from '@angular/core';
import {SubjectCategoryModel} from "../../model/subject-category.model";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SubjectCategoryService} from "../../services/subject-category.service";

@Component({
  selector: 'app-show-subject-category',
  templateUrl: './show-subject-category.component.html',
  styleUrls: ['./show-subject-category.component.css']
})
export class ShowSubjectCategoryComponent implements OnInit {
  c?: SubjectCategoryModel;
  userId: number;
  user?: SubjectCategoryModel;

  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService) {
  }

  ngOnInit() {

      this.userId = this.router.snapshot.params['id']
      console.log('userid', this.userId)
      this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category').subscribe(
        respose => {
          this.user = respose.find(a => a.id === +this.userId)


          console.log("fsfsf", this.user)
        }
      )
       this.subjectCategoryService.disableBtn$.next(true)
    }


  enableBtn() {
    this.subjectCategoryService.disableBtn$.next(false)
  }
}
