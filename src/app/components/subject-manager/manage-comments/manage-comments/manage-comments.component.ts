import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentModel} from "../../../../shared/model/comment.model";
import {SubjectService} from "../../shared/services/subject.service";
import {ApiService} from "../../../../shared/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.css']
})
export class ManageCommentsComponent implements OnInit,AfterViewInit{
  commentForm: FormGroup;
  commentsForm: FormGroup;
  id: number;
  allComment: CommentModel[] = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: string[] = ['id', 'creatorUser', 'createDateTimeComments', 'showComment', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  search: string;
  isLoading = false;
  pageSize = 0;
  currentPage = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  maxall = 100;

  constructor(private fb: FormBuilder,
              private subjectManagerServices: SubjectService,
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
    this.viewComments()
  }

  viewComments() {
    this.subjectManagerServices.allComments(this.id).subscribe(
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  sourceTable() {
    this.isLoading = true;
    this.subjectManagerServices.sortingAllComment(this.paginator.pageIndex + 1, this.paginator.pageSize).subscribe(
      (res) => {
        this.dataSource.data = res;

        this.isLoading = false;
      },
      (err) => {
        console.log("ok");
        // alert("Kolla nätverksanslutnignen(CORS)");
      },
      () => console.log('done a lot  with news!')
    );
  }
  pageChanged(event: PageEvent) {
    console.log({event});
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.sourceTable();
  }
  changeStatusTitle(title: boolean) {
    if (title) {
      return this.translate.instant('form.status-true')
    } else {
      return this.translate.instant('form.status-false')
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
  sortData(event: Sort) {
    // this.subjectManagerServices.sortingCell(event.active, event.direction).subscribe(
    //   value => {
    //     this.dataSource.data = value
    //   }
    // )
  }
}
