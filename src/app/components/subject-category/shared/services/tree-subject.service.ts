import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubjectCategoryModel} from "../../../../shared/model/subject-category.model";

@Injectable({
  providedIn: 'root'
})
export class TreeSubjectService {

  constructor(private http : HttpClient) {
  }
  deleteById(id : number){
    return this.http.delete('http://localhost:3000/article-category/' + `${id}` )
  }

  addSubject(value : any){
    return this.http.post<SubjectCategoryModel>('http://localhost:3000/subject-category' , value)
  }

  editSubject(id : number , articleForm : any){
    return this.http.patch('http://localhost:3000/subject-category/' + `${id}` , articleForm )
  }

  changeHasChild(id : number, body : any){
    return this.http.patch('http://localhost:3000/subject-category/' + `${id}` , body )

  }
}
