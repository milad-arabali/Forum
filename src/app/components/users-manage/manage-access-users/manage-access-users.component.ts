import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {UsersManageService} from "../shared/services/users-manage.service";
import {UserAccountInformationModel} from "../../../shared/model/user-account-information.model";
import {FormMode} from "../../../shared/enumeration/form-mode.enum";

@Component({
  selector: 'app-manage-access-users',
  templateUrl: './manage-access-users.component.html',
  styleUrls: ['./manage-access-users.component.css']
})
export class ManageAccessUsersComponent {
  id: number;
  formMode: FormMode = FormMode.DELETE;

  constructor(
    private dialogRef: MatDialogRef<ManageAccessUsersComponent>,
    private api: ApiService,
    private snack: MatSnackBar,
    private usersManageService: UsersManageService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) private data) {

  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {

    if (this.data.formModeDialog === 3) {
      this.formMode = FormMode.DELETE;
    } else if (this.data.formModeDialog === 4) {
      this.formMode = FormMode.CONFIRM;
    }else if (this.data.formModeDialog === 5) {
      this.formMode = FormMode.ISADMIN;
    }else if (this.data.formModeDialog === 6) {
      this.formMode = FormMode.NOTADMIN;
    }else if (this.data.formModeDialog === 7) {
      this.formMode = FormMode.reject;
    }
  }

  delete() {

    this.api.deleteUsers(this.data.id).subscribe(
      res => {
        this.snack.open(this.translate.instant(this.translate.instant('snackbar.users-delete-value')), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      }
    )

    this.dialogRef.close();

  }

  confirmUsers() {
    const usersConfirm = new UserAccountInformationModel();
    usersConfirm.status = 'confirm';
    this.api.updateRegisterUser(usersConfirm, this.data.id).subscribe(value =>
      this.snack.open(this.translate.instant('snackbar.access-users'), "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    )
    // this.usersManageService.deleteUsersGrid.next(0)
    this.dialogRef.close();
  }

  rejectUsers() {
    const usersConfirm = new UserAccountInformationModel();
    usersConfirm.status = 'reject';
    this.api.updateRegisterUser(usersConfirm, this.data.id).subscribe(value =>
      this.snack.open(this.translate.instant('snackbar.reject-users-access'), "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    )

    this.dialogRef.close();
  }

  toAdmin() {

    const usersConfirm = new UserAccountInformationModel();
    usersConfirm.isAdmin = true;
    this.api.updateRegisterUser(usersConfirm, this.data.id).subscribe(value =>
      this.snack.open(this.translate.instant('snackbar.isAdmin-users'), "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    )
    // this.usersManageService.deleteUsersGrid.next(0)
    this.dialogRef.close();
  }
  disAdmin() {

    const usersConfirm = new UserAccountInformationModel();
    usersConfirm.isAdmin = false;
    this.api.updateRegisterUser(usersConfirm, this.data.id).subscribe(value =>
      this.snack.open(this.translate.instant('snackbar.disAdmin-users'), "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    )
    this.dialogRef.close();
  }
}
