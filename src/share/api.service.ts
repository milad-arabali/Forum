import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {userAccountModel} from "../app/userLogin/useraccount.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   public  apiUrl: string ='http://localhost:3000/enquiry'
  constructor(private httpClient: HttpClient) { }
  getRegisterUserId(id: number){
     return this.httpClient.get<userAccountModel>(`${this.apiUrl}/${id}`)
  }
  getRegisterUser(){
    return this.httpClient.get<userAccountModel[]>(`${this.apiUrl}`)
  }
  postRegistration(registerObj: userAccountModel){
     return this.httpClient.post<userAccountModel>(`${this.apiUrl}`,registerObj)
  }

}
