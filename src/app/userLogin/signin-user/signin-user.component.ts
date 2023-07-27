import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserLoginService} from "../user-login.service";







@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit{
  form=this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    Password: ['', [Validators.required,Validators.minLength(5)]],
  })
// ,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{5,6}$/g)

  constructor(private fb: FormBuilder ,private usersAth: UserLoginService ) {

  }



  ngOnInit() {


  }
  onSubmit() {
    if(this.form.valid){
      console.log(this.form.value)
      const name = this.form.value.username;
      const password : any = this.form.value.Password;
      this.usersAth.usernameLogin(name);
      // this.cookie.set(name,password);
      this.usersAth.signOn(name,password);
    }

  }

}
