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
import {CookieService} from "ngx-cookie-service";
import * as moment from "jalali-moment";


@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.css']
})
export class ForumCommentComponent implements OnInit {
  statusCommentMode: StatusCommentsModeEnum = StatusCommentsModeEnum.CREATED
  commentForm: FormGroup;
  commentsForm: FormGroup;
  id: number;
  userName: string = '';
  likeStatus: number;
  allComment: CommentModel[] = [];
  time;
  likeNumber:number=0;
  dislikeNumber:number=0;

  constructor(private fb: FormBuilder,
              private forumServices: ForumService,
              private api: ApiService,
              private router: ActivatedRoute,
              private snack: MatSnackBar,
              private translate: TranslateService,
              private cookie: CookieService
  ) {
    // moment.locale('fa', { useGregorianParser: true });
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
      status: [],
    })
    this.id = this.router.snapshot.params['id']
  }

  ngOnInit() {
    this.loadSubjectData()
    this.checkLike(this.id)
    this.viewComments()
    this.likeNumberVote()
    this.disLikeNumberVote()
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
        this.commentForm.controls['createDateTime'].setValue
        (moment(value.createDateTime, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
        this.commentForm.controls['creatorUser'].setValue(value.creatorUser)
        this.commentsForm.controls['subjectId'].setValue(value.id)

      }
    )
  }

  likeNumberVote(){
    this.forumServices.likeNumber(this.id).subscribe(
      value => {
        this.likeNumber=value.length
      }
    )
  }
  disLikeNumberVote(){
    this.forumServices.disLikeNumber(this.id).subscribe(
      value => {
        this.dislikeNumber=value.length
      }
    )
  }
  checkLike(id: number) {
    this.api.getSubject(id).subscribe(value => {
      this.forumServices.checkVote(id, this.cookie.get('users')).subscribe(
        value => {
          if (value) {
            this.likeStatus = value[0].voteType;
          }

        }
      )
    })
  }

  addComment() {
    let addComment = new CommentModel();
    addComment.subjectId = this.commentsForm.controls['subjectId'].value
    addComment.userName = this.cookie.get('users')
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
        this.likeNumberVote()
        this.checkLike(this.id)
      }
    )
  }

  addLike() {
    let addLike = new VoteModel();
    addLike.subjectId = this.commentsForm.controls['subjectId'].value
    addLike.voteType = 0
    addLike.userName = this.cookie.get('users')
    addLike.createDateTime = this.commentsForm.controls['createDateTime'].value
    addLike.status = 0
    this.api.addVote(addLike).subscribe(
    )
    this.likeNumberVote()
    this.checkLike(this.id)

  }

  addDisLike() {
    let disLike = new VoteModel();
    disLike.subjectId = this.commentsForm.controls['subjectId'].value
    disLike.voteType = 1
    disLike.userName = this.cookie.get('users')
    disLike.createDateTime = this.commentsForm.controls['createDateTime'].value
    disLike.status = 0
    this.likeStatus = 1;
    this.api.addVote(disLike).subscribe(
    )
    this.disLikeNumberVote()
    this.checkLike(this.id)
  }
}

