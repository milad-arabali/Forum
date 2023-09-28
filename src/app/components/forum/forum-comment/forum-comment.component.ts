import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForumService} from "../shared/services/forum.service";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {CommentModel} from "../../../shared/model/comment.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {VoteModel} from "../../../shared/model/vote.model";
import {StatusCommentsModeEnum} from "../../../shared/enumeration/status-comments-mode.enum";
import {CookieService} from "ngx-cookie-service";
import {SubjectMangerModel} from "../../../shared/model/subject-manger.model";
import {considerSettingUpAutocompletion} from "@angular/cli/src/utilities/completion";


@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.css']
})
export class ForumCommentComponent implements OnInit {
  statusCommentMode: StatusCommentsModeEnum = StatusCommentsModeEnum.CREATED
  commentData: SubjectMangerModel[] = [];
  commentsForm: FormGroup;
  id: number;
  userName: string = '';
  likeStatus: number;
  allComment: CommentModel[] = [];
  time;
  likeNumber: number = 0;
  dislikeNumber: number = 0;
  hasVote: boolean;

  constructor(private fb: FormBuilder,
              private forumServices: ForumService,
              private api: ApiService,
              private router: ActivatedRoute,
              private route: Router,
              private snack: MatSnackBar,
              private translate: TranslateService,
              private cookie: CookieService
  ) {
    // moment.locale('fa', { useGregorianParser: true });

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

    this.viewComments()
    this.likeNumberVote()
    this.disLikeNumberVote()
    this.router.url.subscribe((url: UrlSegment[]) => {
      this.checkSubject(Number(url[1].path))
    })
    this.forumServices.checkVote(this.id, String(this.cookie.get('users'))).subscribe(value => {
      this.likeStatus = value[0].voteType;
      this.hasVote = true;


    })


  }

  viewComments() {
    this.forumServices.allComments(this.id).subscribe(
      value => {
        this.allComment = value

      }
    )
  }

  checkSubject(url: number) {
    this.forumServices.checkCommentId().subscribe(
      value => {
        let path = url
        let id = value.find((a) => a.subjectId === path)
        if (Number.isInteger(path) && id) {

        } else {
          this.snack.open(this.translate.instant('snackbar.comment-notExitForum'), "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
          this.route.navigate(['forum'])
        }
      })
  }

  loadSubjectData() {
    this.api.getSubject(this.id).subscribe(
      value => {
        this.commentData.push(value)

      }
    )
  }

  likeNumberVote() {
    this.forumServices.likeNumber(this.id).subscribe(
      value => {
        this.likeNumber = value.length
      }
    )
  }

  disLikeNumberVote() {
    this.forumServices.disLikeNumber(this.id).subscribe(
      value => {
        this.dislikeNumber = value.length
      }
    )
  }

  // checkLike(id: number) {
  //   setTimeout(() => {
  //       this.forumServices.checkVote(id,String(this.cookie.get('users')) ).subscribe(
  //         value => {
  //           this.likeStatus = value[0].voteType;
  //
  //         })
  //     },100
  //   )
  // }

  addComment() {
    let addComment = new CommentModel();
    addComment.subjectId = this.id
    addComment.userName = this.cookie.get('users')
    addComment.content = this.commentsForm.controls['content'].value
    addComment.status = this.statusCommentMode
    addComment.createDateTime = new Date()
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

      }
    )
  }

  addLike() {
    let addLike = new VoteModel();
    addLike.subjectId = this.id
    addLike.voteType = 0
    addLike.userName = this.cookie.get('users')
    addLike.createDateTime = new Date()
    addLike.status = 0
    if(this.hasVote){
      let updateLike = new VoteModel();
      updateLike.voteType=0
      this.api.updateVote(25, 'test1',updateLike).subscribe()

    }else {
      this.api.addVote(addLike).subscribe()
    }
    this.likeNumberVote()
  }

  addDisLike() {
    let disLike = new VoteModel();
    disLike.subjectId = this.id
    disLike.voteType = 1
    disLike.userName = this.cookie.get('users')
    disLike.createDateTime = new Date()
    disLike.status = 0
    if(this.hasVote){
      let updateLike = new VoteModel();
      updateLike.voteType=1
      this.api.updateVote(25, 'test1',updateLike).subscribe()
    }else {
      this.api.addVote(disLike).subscribe()
    }
    this.disLikeNumberVote()

  }
}

