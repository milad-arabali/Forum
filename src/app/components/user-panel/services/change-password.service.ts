import {Injectable} from '@angular/core';
import {ApiService} from "../../../../share/services/api.service";
import {UserAccountInformationModel} from "../model/user-account-information.model";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  userData: UserAccountInformationModel;
  userData1: UserAccountInformationModel;
  userId: number;

  constructor(
    private api: ApiService,
    private httpClient: HttpClient,
    private snack: MatSnackBar
  ) {
  }


  checkPassword(oldPassword: number, newPassword: number, username1: string) {
    const api = this.api.apiUrl;
    const checkPasswordUser = this.httpClient.get<UserAccountInformationModel[]>(`${api}`).subscribe(
      res => {
        this.userData = res.find(
          x => x.userName === username1
        )
        {
          this.userId = this.userData.id
        }
        if (res.find(
          x => x.password === oldPassword
        )) {
          this.userData.password=newPassword;

          const a = {
            password:  this.userData.password
          };
          this.httpClient.patch(`${this.api.apiUrl}/${this.userId}`, a).subscribe(a=>
            console.log("کلمه عبور کاربر با موفقیت ویرایش شد")
          )

              this.snack.open("کلمه عبور کاربر با موفقیت ویرایش شد", "", {
                duration: 3000,
                horizontalPosition: "end",
                verticalPosition: "top"
              })

        } else {
          this.snack.open("کلمه عبور جاری کاربر نامعتبر است.", "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
        }
      })
  }


}
