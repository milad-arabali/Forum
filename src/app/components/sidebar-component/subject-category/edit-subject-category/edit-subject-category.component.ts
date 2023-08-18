import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {SubjectCategoryFlatNodeModel} from "../../model/subject-category-flat-node.model";
import {SubjectCategoryService} from "../../services/subject-category.service";
import {SubjectCategoryModel} from "../../model/subject-category.model";
import {find} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-subject-category',
  templateUrl: './edit-subject-category.component.html',
  styleUrls: ['./edit-subject-category.component.css']
})
export class EditSubjectCategoryComponent implements OnInit {
  c?: SubjectCategoryModel;
  userId: number;
  user?: SubjectCategoryModel;

  ngOnInit() {
    this.userId = this.router.snapshot.params['id']
    console.log('userid', this.userId)
    this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category').subscribe(
      respose => {
        this.user = respose.find(a => a.id === +this.userId)


        console.log("fsfsf", this.user)
      }
    )
  }

  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private s: SubjectCategoryService) {
  }


}
