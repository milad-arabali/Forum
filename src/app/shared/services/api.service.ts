import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAccountInformationModel} from "../model/user-account-information.model";
import {SubjectCategoryModel} from "../model/subject-category.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   public  apiUrl: string ='http://localhost:3000/enquiry'
   public  apiUrlSubjectCategory: string ='http://localhost:3000/subject-category'
  constructor(private httpClient: HttpClient) { }

  updateRegisterUser(registerObj: UserAccountInformationModel, id : number){
    return this.httpClient.patch<UserAccountInformationModel[]>(`${this.apiUrl}/${id}`,registerObj)
  }
  getSubjectCategory(id : number){
    return this.httpClient.get<SubjectCategoryModel>(`${this.apiUrlSubjectCategory}/${id}`)
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

}
