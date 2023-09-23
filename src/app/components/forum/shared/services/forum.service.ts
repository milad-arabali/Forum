import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SubjectMangerModel} from "../../../../shared/model/subject-manger.model";
import {HttpClient} from "@angular/common/http";
import {VoteModel} from "../../../../shared/model/vote.model";
import {CommentModel} from "../../../../shared/model/comment.model";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http:HttpClient) { }

  findSubject(a: number): Observable<SubjectMangerModel[]> {
    return this.http.get<SubjectMangerModel[]>(
      'http://localhost:3000/subject?parentId=' + `${a}`);
  }
  checkVote(subjectId:number){
    return this.http.get<VoteModel>('http://localhost:3000/vote?subjectId=' + `${subjectId}`);
  }
  allComments(subjectId:number){
    return this.http.get<CommentModel[]>('http://localhost:3000/comment?subjectId='+`${subjectId}`+'&status=1');
  }
}
