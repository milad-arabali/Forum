import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SubjectMangerModel} from "../../../../shared/model/subject-manger.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http:HttpClient) { }

  findSubject(a: number): Observable<SubjectMangerModel[]> {
    return this.http.get<SubjectMangerModel[]>(
      'http://localhost:3000/subject?parentId=' + `${a}`);
  }

}
