import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAccountInformationModel} from "../model/user-account-information.model";
import {SubjectCategoryModel} from "../model/subject-category.model";
import {SubjectMangerModel} from "../model/subject-manger.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   public  apiUrl: string ='http://localhost:3000/enquiry'
   public  apiUrlSubjectCategory: string ='http://localhost:3000/subject-category'
  public  apiUrlSubject: string ='http://localhost:3000/subject'
  constructor(private httpClient: HttpClient) { }

  updateRegisterUser(registerObj: UserAccountInformationModel, id : number){
    return this.httpClient.patch<UserAccountInformationModel[]>(`${this.apiUrl}/${id}`,registerObj)
  }
  getSubjectCategory(id : number){
    return this.httpClient.get<SubjectCategoryModel>(`${this.apiUrlSubjectCategory}/${id}`)
  }

  getAllSubjectCategory(){
    return this.httpClient.get<SubjectCategoryModel[]>(`${this.apiUrlSubjectCategory}`)
  }
  updateSubjectCategory(registerObj: SubjectCategoryModel, id : number){
    return this.httpClient.patch<SubjectCategoryModel>(`${this.apiUrlSubjectCategory}/${id}`,registerObj)
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
  getSubject(id : number){
    return this.httpClient.get<SubjectMangerModel>(`${this.apiUrlSubject}/${id}`)
  }
  updateSubject(subjectManger: SubjectMangerModel,id : number){
    return this.httpClient.patch<SubjectMangerModel>(`${this.apiUrlSubject}/${id}`,subjectManger)
  }
   deleteSubject(id : number){
    return this.httpClient.delete<SubjectMangerModel>(`${this.apiUrlSubject}/${id}`)
  }
}
