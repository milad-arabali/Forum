import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectCategoryModel} from "../../../shared/model/subject-category.model";
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubjectService} from "../shared/services/subject.service";

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
    private subjectService:SubjectService) {
  }

  close() {
    this.dialogRef.close();
  }
ngOnInit() {
    this.subjectService.deleteSubjectGrid.subscribe(
      value =>
        this.id=value
    )
}

  delete() {
    this.api.deleteSubject(this.id).subscribe(
      res => {
        this.snack.open("اطلاعات  با موفقیت حذف شد", "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      }
    )
    this.dialogRef.close();

  }
}
