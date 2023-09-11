import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubjectService} from "../../subject-manager/shared/services/subject.service";
import {TranslateService} from "@ngx-translate/core";
import {UsersManageService} from "../shared/services/users-manage.service";

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent {
  id:number;
  constructor(
    private dialogRef: MatDialogRef<DeleteUsersComponent>,
    private api:ApiService,
    private snack:MatSnackBar,
    private usersManageService:UsersManageService,
    private translate:TranslateService) {
  }

  close() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.usersManageService.deleteUsersGrid.subscribe(
      value =>
        this.id=value
    )
  }

  delete() {
    this.api.deleteUsers(this.id).subscribe(
      res => {
        this.snack.open(this.translate.instant('snackbar.users-delete-value'), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      }
    )
    this.dialogRef.close();

  }
}
