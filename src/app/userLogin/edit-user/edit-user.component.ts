import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../user-login.service";
import {ApiService} from "../../../share/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  form:FormGroup;
  gender:string[]=['مرد','زن']
  ss : any =this.userEditForm.s();

  constructor( private Fb:FormBuilder,private userEditForm: UserLoginService, private api:ApiService ,public snack : MatSnackBar) {
    this.form= this.Fb.group(

      {
        name:[],
        nameFamily:[],
        nationalCode: [],
        gender: [],
        DateOfBirth: []

      }

    )
  }
  ngOnInit() {
    let s = this.userEditForm.s()
     let ss = 'ssss'
  }

  submit() {
        this.api.postRegistration(this.form.value).subscribe( res=>
          {
            this.snack.open("نام کاربری یا پسورد وجود ندارد","",{

              duration:3000,
              horizontalPosition: "end",
              verticalPosition: "top"

            })
            this.form.reset();
          }

        )
  }
}
