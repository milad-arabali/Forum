import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForumService} from "../shared/services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {CommentModel} from "../../../shared/model/comment.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {VoteModel} from "../../../shared/model/vote.model";
import {StatusCommentsModeEnum} from "../../../shared/enumeration/status-comments-mode.enum";



@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.css']
})
export class ForumCommentComponent implements OnInit {
  statusCommentMode:StatusCommentsModeEnum= StatusCommentsModeEnum.CREATED
  commentForm: FormGroup;
  commentsForm: FormGroup;
  id: number;
  likeStatus: boolean;
  allComment: CommentModel[] = [];

  time;

  constructor(private fb: FormBuilder,
              private forumServices: ForumService,
              private api: ApiService,
              private router: ActivatedRoute,
              private snack: MatSnackBar,
              private translate: TranslateService
  ) {

    this.commentForm = this.fb.group({
      subjectCategory: [],
      subjectTitle: [],
      createDateTime: [],
      creatorUser: [],
    })
    this.commentsForm = this.fb.group({
      subjectId: [],
      content: [, Validators.required],
      subjectTitle: [],
      createDateTime: [new Date()],
      status: ['created'],
    })
    this.id = this.router.snapshot.params['id']

  }

  ngOnInit() {
    this.loadSubjectData()
    setTimeout(() => {
      this.checkLike(this.id)
    }, 10)
    this.viewComments()
  }

  viewComments() {
    this.forumServices.allComments(this.id).subscribe(
      value => {
          this.allComment = value
      }

    )
  }

  loadSubjectData() {
    this.api.getSubject(this.id).subscribe(
      value => {
        this.commentForm.controls['subjectCategory'].setValue(value.categoryTitle)
        this.commentForm.controls['subjectTitle'].setValue(value.title)
        this.commentForm.controls['createDateTime'].setValue(value.createDateTime)
        this.commentForm.controls['creatorUser'].setValue(value.creatorUser)
        this.commentsForm.controls['subjectId'].setValue(value.id)
      }
    )
  }

  addComment() {
    let addComment = new CommentModel();
    addComment.subjectId = this.commentsForm.controls['subjectId'].value
    addComment.userName = this.commentForm.controls['creatorUser'].value
    addComment.content = this.commentsForm.controls['content'].value
    addComment.status = this.statusCommentMode
    addComment.createDateTime = this.commentsForm.controls['createDateTime'].value
    this.api.addComment(addComment).subscribe(
      value => {
        this.snack.open(this.translate.instant('snackbar.save-comment'), "", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top"
        })
        this.commentsForm.controls['content'].reset()
        this.viewComments()
      }
    )

  }


  checkLike(id: number) {
    this.forumServices.checkVote(id).subscribe(
      value => {

        if (value.voteType === 'like') {
          this.likeStatus = true;
        } else if (value.voteType === 'reject') {
          this.likeStatus = false;
        }
      }
    )
  }

  addLike() {
    let addLike = new VoteModel();
    addLike.subjectId = this.commentsForm.controls['subjectId'].value
    addLike.voteType = 'like'
    addLike.userName = this.commentForm.controls['creatorUser'].value
    addLike.createDateTime = this.commentForm.controls['createDateTime'].value
    addLike.status = this.commentsForm.controls['status'].value
    this.api.addVote(addLike).subscribe(

    )
  }

  addDisLike() {
    let disLike = new VoteModel();
    disLike.subjectId = this.commentsForm.controls['subjectId'].value
    disLike.voteType = 'reject'
    disLike.userName = this.commentForm.controls['creatorUser'].value
    disLike.createDateTime = this.commentForm.controls['createDateTime'].value
    disLike.status = this.commentsForm.controls['status'].value
    this.api.addVote(disLike).subscribe(

    )
  }
}

