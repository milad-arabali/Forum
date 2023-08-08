import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAccountInformationModel} from "../../app/components/user-panel/model/user-account-information.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   public  apiUrl: string ='http://localhost:3000/enquiry'
  constructor(private httpClient: HttpClient) { }
  getRegisterUserId(id: number){
     return this.httpClient.get<UserAccountInformationModel>(`${this.apiUrl}/${id}`)
  }
  updateRegisterUser(registerObj: UserAccountInformationModel, id : number){
    return this.httpClient.patch<UserAccountInformationModel[]>(`${this.apiUrl}/${id}`,registerObj)
  }
  postRegistration(registerObj: UserAccountInformationModel){
     return this.httpClient.post<UserAccountInformationModel>(`${this.apiUrl}`,registerObj)
  }
   showInformation(){
     return this.httpClient.get<UserAccountInformationModel>(`${this.apiUrl}`)
   }
}
