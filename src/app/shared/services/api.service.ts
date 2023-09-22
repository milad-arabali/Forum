import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAccountInformationModel} from "../model/user-account-information.model";
import {SubjectCategoryModel} from "../model/subject-category.model";
import {SubjectMangerModel} from "../model/subject-manger.model";
import {CommentModel} from "../model/comment.model";
import {VoteModel} from "../model/vote.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public  apiUrl: string ='http://localhost:3000/enquiry'
  public  apiUrlSubjectCategory: string ='http://localhost:3000/subject-category'
  public  apiUrlSubject: string ='http://localhost:3000/subject'
  public  apiUrlComment: string ='http://localhost:3000/comment'
  public  apiUrlVote: string ='http://localhost:3000/vote'
  constructor(private httpClient: HttpClient) { }

  updateRegisterUser(registerObj: UserAccountInformationModel, id : number){
    return this.httpClient.patch<UserAccountInformationModel[]>(`${this.apiUrl}/${id}`,registerObj)
  }
  updatePasswordUser(registerObj: UserAccountInformationModel, id : number){
    return this.httpClient.patch<UserAccountInformationModel>(`${this.apiUrl}/${id}`,registerObj)
  }
  getIsAdmin(name:String){
    return this.httpClient.get<UserAccountInformationModel[]>(`http://localhost:3000/enquiry?userName=`+ `${name}`)
  }
  getUserInformation(id:number){
    return this.httpClient.get<UserAccountInformationModel>(`${this.apiUrl}/${id}`)
  }
  getSubjectCategory(id : number){
    return this.httpClient.get<SubjectCategoryModel>(`${this.apiUrlSubjectCategory}/${id}`)
  }
  getAllUsers(){
    return this.httpClient.get<UserAccountInformationModel[]>(`${this.apiUrl}`)
  }
  getAllSubjectCategory(){
    return this.httpClient.get<SubjectCategoryModel[]>(`${this.apiUrlSubjectCategory}`)
  }
  updateSubjectCategory(registerObj: SubjectCategoryModel, id : number){
    return this.httpClient.patch<SubjectCategoryModel>(`${this.apiUrlSubjectCategory}/${id}`,registerObj)
  }
  changeHasChild(id : number, body:any){
    return this.httpClient.patch(`${this.apiUrlSubjectCategory}/${id}`,body)
  }
  deleteSubjectCategory(id : number){
    return this.httpClient.delete<SubjectCategoryModel[]>(`${this.apiUrlSubjectCategory}/${id}`)
  }
  addSubjectCategory(subjectCategoryModel:SubjectCategoryModel){
    return this.httpClient.post<SubjectCategoryModel>(`${this.apiUrlSubjectCategory}`,subjectCategoryModel)
  }
  postRegistration(registerObj: UserAccountInformationModel){
    return this.httpClient.post<UserAccountInformationModel>(`${this.apiUrl}`,registerObj)
  }
  SubjectCategoryUser(user:string){
    return this.httpClient.get<UserAccountInformationModel>(`http://localhost:3000/enquiry?userName=`+ `${user}`)
  }
  addSubject(subjectMangerModel: SubjectMangerModel){
    return this.httpClient.post<SubjectMangerModel>(`${this.apiUrlSubject}`,subjectMangerModel)
  }
  addUsers(UsersModel: UserAccountInformationModel){
    return this.httpClient.post<UserAccountInformationModel>(`${this.apiUrl}`,UsersModel)
  }
  getSubject(id : number){
    return this.httpClient.get<SubjectMangerModel>(`${this.apiUrlSubject}/${id}`)
  }
  updateSubject(subjectManger: SubjectMangerModel,id : number){
    return this.httpClient.patch<SubjectMangerModel>(`${this.apiUrlSubject}/${id}`,subjectManger)
  }
  deleteSubject(id : number){
    return this.httpClient.delete<SubjectMangerModel>(`${this.apiUrlSubject}/${id}`)
  }
  deleteUsers(id : number){
    return this.httpClient.delete<UserAccountInformationModel>(`${this.apiUrl}/${id}`)
  }
  addComment(UsersModel: CommentModel){
    return this.httpClient.post<CommentModel>(`${this.apiUrlComment}`,UsersModel)
  }
  addVote(voteModel: VoteModel){
    return this.httpClient.post<VoteModel>(`${this.apiUrlVote}`,voteModel)
  }
}
