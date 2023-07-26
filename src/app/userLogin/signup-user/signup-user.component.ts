import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserLoginService} from "../user-login.service";

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent {
  form=this.signUpfb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    Password: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g),Validators.minLength(5)]],
  })
  constructor(private signUpfb: FormBuilder) {

  }
}
