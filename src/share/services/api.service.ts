import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {userAccountModel} from "../../app/components/user-panel/model/useraccount.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   public  apiUrl: string ='http://localhost:3000/enquiry'
  constructor(private httpClient: HttpClient) { }
  getRegisterUserId(id: number){
     return this.httpClient.get<userAccountModel>(`${this.apiUrl}/${id}`)
  }
  updateRegisterUser(registerObj: userAccountModel,id : number){
    return this.httpClient.patch<userAccountModel>(`${this.apiUrl}/${id}}`,registerObj)
  }
  postRegistration(registerObj: userAccountModel){
     return this.httpClient.post<userAccountModel>(`${this.apiUrl}`,registerObj)
  }
   showInformation(){
     return this.httpClient.get<userAccountModel>(`${this.apiUrl}`)
   }
}
