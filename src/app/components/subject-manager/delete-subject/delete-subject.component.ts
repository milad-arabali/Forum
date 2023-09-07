import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-subject',
  templateUrl: './delete-subject.component.html',
  styleUrls: ['./delete-subject.component.css']
})
export class DeleteSubjectComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteSubjectComponent>,
  ) {
  }

}
