import {Injectable} from '@angular/core';
import {ApiService} from "../../../../../shared/services/api.service";
import {UserAccountInformationModel} from "../../../../../shared/model/user-account-information.model";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  userData: UserAccountInformationModel;
  userId: number;

  constructor(
    private api: ApiService,
    private httpClient: HttpClient,
    private snack: MatSnackBar,
    private translate:TranslateService
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

              this.snack.open(this.translate.instant('snackbar.password-edit'), "", {
                duration: 3000,
                horizontalPosition: "end",
                verticalPosition: "top"
              })

        } else {
          this.snack.open(this.translate.instant('snackbar.password-edit-valid-error'), "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
        }
      })
  }


}
