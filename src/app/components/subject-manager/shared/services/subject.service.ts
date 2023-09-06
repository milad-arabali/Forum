import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SubjectCategoryModel} from "../../../../shared/model/subject-category.model";
import {SubjectMangerModel} from "../../../../shared/model/subject-manger.model";




@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  constructor(private http:HttpClient) { }
  checkId(): Observable<SubjectMangerModel[]>{
    return this.http.get<SubjectMangerModel[]>('http://localhost:3000/subject');
  }
  findSubject(a:string): Observable<SubjectMangerModel[]> {
    return this.http.get<SubjectMangerModel[]>(
      'http://localhost:3000/subject?' + `${a}`);
  }
}
