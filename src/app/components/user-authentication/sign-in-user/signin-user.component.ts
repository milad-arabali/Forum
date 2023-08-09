import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../../user-panel/services/user-login.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-sign-in-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {
  @ViewChild("myInput") private _inputElement: ElementRef;
  form: FormGroup;
  pending = true;

  constructor(private fb: FormBuilder,
              private usersAth: UserLoginService,
              private cookie: CookieService,
              private router: Router,
              private c: CookieService,
              translate: TranslateService) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
    this.form = this.fb.group({
      username: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
          Validators.pattern('^[a-zA-Z0-9\-\_\/]+$')
        ])
      ],
      Password: ['', [Validators.required, Validators.minLength(5)]],
    })
    // ,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{5,6}$/g)

  }


  ngOnInit() {

    console.log('34: ', this.form.get('username').errors)
    const a = this.cookie.get('login')
    if (a) {
      console.log('dddd', a)
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {

    if (this.form.valid) {
      console.log(this.form.value)
      const name = this.form.value.username;
      const password: any = this.form.value.Password;

      this.usersAth.signOn(name, password);
    }
    this.form.reset();
    this._inputElement.nativeElement.focus();

  }
}
