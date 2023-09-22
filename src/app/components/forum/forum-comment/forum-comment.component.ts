import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForumService} from "../shared/services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";


@Component({
  selector: 'app-forum-comment',
  templateUrl: './forum-comment.component.html',
  styleUrls: ['./forum-comment.component.css']
})
export class ForumCommentComponent implements OnInit{
  commentForm:FormGroup;
  id:number;
  constructor(private fb:FormBuilder,
              private forumServices:ForumService,
              private api:ApiService,
              private router:ActivatedRoute) {
    this.commentForm= this.fb.group({
      subjectCategory: [],
      subjectTitle: [],
      createDateTime: [],
      creatorUser: [],
    })
    this.id = this.router.snapshot.params['id']

  }
ngOnInit() {
    this.loadSubjectData()
}
loadSubjectData(){
  this.api.getSubject(this.id).subscribe(
    value => {
      console.log("sdsd", value);
      this.commentForm.controls['subjectCategory'].setValue(value.categoryTitle)
      this.commentForm.controls['subjectTitle'].setValue(value.title)
      this.commentForm.controls['createDateTime'].setValue(value.createDateTime)
      this.commentForm.controls['creatorUser'].setValue(value.creatorUser)
    }
  )
}
}
