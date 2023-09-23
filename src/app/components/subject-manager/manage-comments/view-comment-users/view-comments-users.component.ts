import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

import {StatusCommentsModeEnum} from "../../../../shared/enumeration/status-comments-mode.enum";
import {SubjectService} from "../../shared/services/subject.service";
import {CommentModel} from "../../../../shared/model/comment.model";

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments-users.component.html',
  styleUrls: ['./view-comments-users.component.css']
})
export class ViewCommentsUsersComponent {
  id: number;
  commentUsers:String;
  CommentsMode: StatusCommentsModeEnum = StatusCommentsModeEnum.VIEW;

  constructor(
    private dialogRef: MatDialogRef<ViewCommentsUsersComponent>,
    private api: ApiService,
    private snack: MatSnackBar,
    private subjectService: SubjectService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) private data) {

  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data.formModeDialog === 3) {
      this.CommentsMode = StatusCommentsModeEnum.VIEW;
    } else if (this.data.formModeDialog === 2) {
      this.CommentsMode = StatusCommentsModeEnum.REJECT;
    } else if (this.data.formModeDialog === 1) {
      this.CommentsMode = StatusCommentsModeEnum.CONFIRM;
    } else if (this.data.formModeDialog === 0) {
      this.CommentsMode = StatusCommentsModeEnum.CREATED;
    } else if (this.data.formModeDialog === 4) {
      this.CommentsMode = StatusCommentsModeEnum.DELETE;
    }
    this.showComment()
  }

  showComment(){
    this.subjectService.ViewComment(this.data.id).subscribe(
      value => {
        this.commentUsers=value[0].content;

      }
    )
  }
  deleteComment() {

    this.api.deleteComment(this.data.id).subscribe(
      res => {
        this.snack.open(this.translate.instant(this.translate.instant('snackbar.delete-comment')), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
      }
    )
    this.dialogRef.close();

  }

  confirmComment() {
    const confirmComment = new CommentModel();
    confirmComment.status = 1;
    this.api.updateComment(confirmComment, this.data.id).subscribe(value =>
      this.snack.open(this.translate.instant('snackbar.confirm-comment'), "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    )
    this.dialogRef.close();
  }

  rejectComment() {
    const rejectComment = new CommentModel();
    rejectComment.status = 2;
    this.api.updateComment(rejectComment, this.data.id).subscribe(value =>
      this.snack.open(this.translate.instant('snackbar.reject-comment'), "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    )

    this.dialogRef.close();
  }

}
