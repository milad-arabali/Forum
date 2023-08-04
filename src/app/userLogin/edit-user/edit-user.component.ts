import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../user-login.service";
import {ApiService} from "../../../share/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Params} from "@angular/router";
import {userAccountModel} from "../useraccount.model";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  gender: string[] = ['مرد', 'زن']
  a:boolean=true;


  constructor(private route: ActivatedRoute, private Fb: FormBuilder, private userEditForm: UserLoginService, private httpClient: HttpClient, private api: ApiService, public snack: MatSnackBar, private c: CookieService) {
    this.form = this.Fb.group(
      {
        userName: [ ],
        name: [],
        nameFamily: [],
        nationalCode: [],
        gender: [],
        DateOfBirth: []

      }
    )
  }

  userEdit ?: userAccountModel;
  username1 = this.c.get('users')
  r:userAccountModel;
  ngOnInit() {
    const api = this.api.apiUrl;
    let users1 = this.httpClient.get<userAccountModel[]>(`${api}`).subscribe(res => {
      this.r = res.find(
        x => x.userName === this.username1,
      )
     this.showUserConfig(this.r)
    })


  }

  showUserConfig(user: userAccountModel) {
    this.form.setValue({
        userName: { value:user.userName,disabled: true},
        name: user.name,
        nameFamily: user.nameFamily,
        nationalCode: user.nationalCode,
        gender: user.gender,
        DateOfBirth: user.DateOfBirth
      }
    )
  }

  submit() {


  }
}
