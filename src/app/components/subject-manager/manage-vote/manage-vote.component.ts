import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentModel} from "../../../shared/model/comment.model";
import {ApiService} from "../../../shared/services/api.service";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {SubjectService} from "../shared/services/subject.service";
import {SubjectMangerModel} from "../../../shared/model/subject-manger.model";
import {ViewCommentsUsersComponent} from "../manage-comments/view-comment-users/view-comments-users.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-view-comments',
  templateUrl: './manage-vote.component.html',
  styleUrls: ['./manage-vote.component.css']
})
export class ManageVoteComponent implements OnInit, AfterViewInit {
  CommentDate: SubjectMangerModel[] = [];
  commentsForm: FormGroup;
  id: number;
  allComment: CommentModel[] = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: string[] = ['id', 'creatorUser', 'createDateTimeComments', 'showVote'];
  dataSource = new MatTableDataSource();
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
              private translate: TranslateService,
              private route:Router
  ) {

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
      this.sourceTable()
      this.dataSource.paginator = this.paginator;
    }, 100)
    this.router.url.subscribe((url: UrlSegment[]) => {
      this.checkSubject(Number(url[2].path))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  checkSubject(url: number) {
    this.subjectManagerServices.checkVoteId().subscribe(
      value => {
        let path = url
        let id = value.find((a) => a.subjectId === path)
        if (Number.isInteger(path) && id) {

        } else {
          this.snack.open(this.translate.instant('snackbar.vote-notExit'), "", {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top"
          })
          this.route.navigate(['subject'])
        }
      })
  }

  loadSubjectData() {
    this.api.getSubject(this.id).subscribe(
      value => {
        this.CommentDate.push(value)
      }
    )
  }


  sourceTable() {
    this.isLoading = true;
    this.subjectManagerServices.sortingAllVote(
      this.paginator.pageIndex + 1, this.paginator.pageSize, this.id).subscribe(
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
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.sourceTable();
  }

  changeStatusTitle(title: number) {
    if (title === 0) {
      return this.translate.instant('table.confirm-vote')
    } else if (title === 1) {
      return this.translate.instant('table.reject-vote')
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  sortData(event: Sort) {
    this.subjectManagerServices.sortingCellVote(event.active, event.direction, this.id).subscribe(
      value => {
        this.dataSource.data = value
      }
    )
  }
}
