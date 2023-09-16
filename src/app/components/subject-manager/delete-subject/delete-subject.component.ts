import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubjectService} from "../shared/services/subject.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-delete-subject',
  templateUrl: './delete-subject.component.html',
  styleUrls: ['./delete-subject.component.css']
})
export class DeleteSubjectComponent implements OnInit{
  id:number;
  constructor(
    private dialogRef: MatDialogRef<DeleteSubjectComponent>,
    private api:ApiService,
    private snack:MatSnackBar,
    private subjectService:SubjectService,
    @Inject(MAT_DIALOG_DATA) private data,
    private translate:TranslateService) {
  }

  close() {
    this.dialogRef.close();
  }
ngOnInit() {

}

  delete() {
    this.api.deleteSubject(this.data.id).subscribe(
      res => {
        this.snack.open(this.translate.instant('snackbar.subject-manager-delete-value'), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      }
    )
    this.dialogRef.close();

  }
}
