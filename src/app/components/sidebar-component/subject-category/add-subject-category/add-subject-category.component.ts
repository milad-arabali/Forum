import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SubjectCategoryService} from "../../services/subject-category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../share/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-add-subject-category',
  templateUrl: './add-subject-category.component.html',
  styleUrls: ['./add-subject-category.component.css']
})
export class AddSubjectCategoryComponent {
  addSubjectCategoryForm:FormGroup;
  constructor(private router: ActivatedRoute,
              private http: HttpClient,
              private subjectCategoryService: SubjectCategoryService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('fa-IR');
    this.addSubjectCategoryForm = this.fb.group({
      title: ['', Validators.required],
      createDateTime: ['', Validators.required],
      status: ['', Validators.required]

    })
  }
}
