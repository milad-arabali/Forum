import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {UsersManageService} from "../shared/services/users-manage.service";
import {UserAccountInformationModel} from "../../../shared/model/user-account-information.model";
import {FormMode} from "../../../shared/enumeration/form-mode.enum";

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent {
  id: number;
  formMode: FormMode = FormMode.DELETE;

  constructor(
    private dialogRef: MatDialogRef<DeleteUsersComponent>,
    private api: ApiService,
    private snack: MatSnackBar,
    private usersManageService: UsersManageService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) private data) {

  }

  close() {
    this.dialogRef.close();
    // this.usersManageService.deleteUsersGrid.next(0)
    // this.usersManageService.formModeDialog.next(0)

  }

  ngOnInit() {
    // this.usersManageService.deleteUsersGrid.subscribe(
    //   value =>
    //     this.id=value
    // )
    // this.usersManageService.formModeDialog.subscribe(
    //   value =>{
    //     if(value === 3){
    //       this.formMode=FormMode.DELETE;
    //     }else if (value === 4){
    //       this.formMode=FormMode.CONFIRM;
    //     }else if (value === 5){
    //       this.formMode=FormMode.ISADMIN;
    //     }else if (value === 6){
    //       this.formMode=FormMode.NOTADMIN;
    //     }else if (value === 7){
    //       this.formMode=FormMode.reject;
    //     }
    //   }
    // )
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
        this.snack.open(this.translate.instant('snackbar.users-delete-value'), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      }
    )
    // this.usersManageService.deleteUsersGrid.next(0)
    this.dialogRef.close();

  }

  confirmUsers() {
    const usersConfirm = new UserAccountInformationModel();
    usersConfirm.status = 'confirm';
    this.api.updateRegisterUser(usersConfirm, this.data.id).subscribe(value =>
      this.snack.open("تغییر یافت", "", {
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
      this.snack.open("تغییر یافت", "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    )
    // this.usersManageService.deleteUsersGrid.next(0)
    this.dialogRef.close();
  }

  toAdmin() {

    const usersConfirm = new UserAccountInformationModel();
    usersConfirm.isAdmin = true;
    this.api.updateRegisterUser(usersConfirm, this.data.id).subscribe(value =>
      this.snack.open("تغییر یافت", "", {
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
      this.snack.open("تغییر یافت", "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    )
    // this.usersManageService.deleteUsersGrid.next(0)
    this.dialogRef.close();
  }
}
