import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserLoginService} from "../user-login.service";

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent {
  form=this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    Password: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g),Validators.minLength(5)]],
  })
  userName1 : any;
  constructor(private fb: FormBuilder ,private usersath: UserLoginService) {

  }
  ngOnInit() {
    // this.userName1 = this.usersath.getUsers();
  }

  get userName(){
    return this.form.controls['username']
  }
}
