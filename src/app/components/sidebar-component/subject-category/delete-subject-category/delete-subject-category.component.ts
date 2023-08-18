import {Component} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {UserLoginService} from "../../../user-panel/services/user-login.service";

@Component({
  selector: 'app-delete-subject-category',
  templateUrl: './delete-subject-category.component.html',
  styleUrls: ['./delete-subject-category.component.css']
})
export class DeleteSubjectCategoryComponent {
  constructor(private logOut: CookieService,
              private route: Router,
              private dialogRef: MatDialogRef<DeleteSubjectCategoryComponent>,
              translate: TranslateService,
  ) {
    translate.addLangs(['fa', 'klingon']);
    translate.setDefaultLang('fa');
    translate.use('fa');
  }

  close() {

    this.dialogRef.close();

  }

  delete() {


  }
}
