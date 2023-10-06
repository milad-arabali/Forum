import { Injectable } from '@angular/core';
import {SubjectMangerModel} from "../../../shared/model/subject-manger.model";
import {UserAccountInformationModel} from "../../../shared/model/user-account-information.model";
import {SubjectCategoryModel} from "../../../shared/model/subject-category.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChartService {



  public  apiUrl: string ='http://localhost:3000/enquiry'
  public  apiUrlSubjectCategory: string ='http://localhost:3000/subject-category'
  public  apiUrlSubject: string ='http://localhost:3000/subject'
  public  apiUrlComment: string ='http://localhost:3000/comment'
  public  apiUrlVote: string ='http://localhost:3000/vote'
  constructor(private httpClient:HttpClient) {
  }
  getAllSubjectCategory(){
    return this.httpClient.get<SubjectCategoryModel[]>(`${this.apiUrlSubjectCategory}`)
  }
  getActiveCategory(){
    return this.httpClient.get<SubjectCategoryModel[]>(`http://localhost:3000/subject-category?hasChild=true`)
  }
  getInactiveCategory(){
    return this.httpClient.get<SubjectCategoryModel[]>(`http://localhost:3000/subject-category?hasChild=false`)
  }
  getAllSubject(){
    return this.httpClient.get<SubjectMangerModel[]>(`${this.apiUrlSubject}`)
  }
  getActiveSubject(){
    return this.httpClient.get<SubjectMangerModel[]>(`http://localhost:3000/subject?status=true`)
  }
  getInactiveSubject(){
    return this.httpClient.get<SubjectMangerModel[]>(`http://localhost:3000/subject?status=false`)
  }
  getAllUsers(){
    return this.httpClient.get<UserAccountInformationModel[]>(`${this.apiUrl}`)
  }
  getUsersStatusConfirm(){
    return this.httpClient.get<UserAccountInformationModel[]>(`http://localhost:3000/enquiry?status=confirm`)
  }
  getUsersStatusRegistered(){
    return this.httpClient.get<UserAccountInformationModel[]>(`http://localhost:3000/enquiry?status=Registered`)
  }
  getUsersStatusReject(){
    return this.httpClient.get<UserAccountInformationModel[]>(`http://localhost:3000/enquiry?status=Registered&status=reject`)
  }
  getTimeDateSubject(time:any){
    return this.httpClient.get<SubjectMangerModel[]>(`http://localhost:3000/subject?createDateTime_like=`+`${time}`)
  }
  getTimeSaveUsers(time:any){
    return this.httpClient.get<UserAccountInformationModel[]>(`http://localhost:3000/enquiry?currentDate_like=`+`${time}`)
  }
  getTimeDateComment(time:any){
    return this.httpClient.get<UserAccountInformationModel[]>(`http://localhost:3000/comment?createDateTime_like=`+`${time}`)
  }
  getTimeDateSubjectData(){
    return this.httpClient.get<SubjectMangerModel[]>(`http://localhost:3000/subject?currentDate_gte=2023-09-24`)
  }
}
