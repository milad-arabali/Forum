import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentModel} from "../../../shared/model/comment.model";
import {SubjectService} from "../shared/services/subject.service";
import {ApiService} from "../../../shared/services/api.service";
import {ActivatedRoute, Route, Router, UrlSegment} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {ViewCommentsUsersComponent} from "./view-comment-users/view-comments-users.component";
import {SubjectMangerModel} from "../../../shared/model/subject-manger.model";
import {MatMenuTrigger} from "@angular/material/menu";


@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.css']
})
export class ManageCommentsComponent implements OnInit {
  commentFormData: SubjectMangerModel[]=[];
  commentsForm: FormGroup;
  id: number;
  allComment: CommentModel[] = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: string[] = ['id', 'creatorUser', 'createDateTimeComments', 'showComment', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  pageSize = 0;
  currentPage = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalElements = 0;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition= {x: '0px', y: '0px'}
  constructor(private fb: FormBuilder,
              private subjectManagerServices: SubjectService,
              private api: ApiService,
              private router: ActivatedRoute,
              private snack: MatSnackBar,
              private translate: TranslateService,
              private dialog: MatDialog,
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
    setTimeout(() => {
      this.sourceTable()
      // this.dataSource.paginator = this.paginator;
    }, 100)
    this.loadSubjectData();
    // this.viewComments();
    this.router.url.subscribe((url: UrlSegment[]) => {
    this.checkSubject(Number(url[2].path))

    })

  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //
  // }
  onContextMenu(event: MouseEvent, item: SubjectMangerModel): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item};
    // @ts-ignore
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
  changePagination(event: PageEvent){
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sourceTable()
  }

  checkSubject(url: number) {
    this.subjectManagerServices.checkCommentId().subscribe(
      value => {
        let path = url
        let id = value.find((a) => a.subjectId === path)
        if (Number.isInteger(path) && id) {

        } else {
          this.snack.open(this.translate.instant('snackbar.comment-notExit'), "", {
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
          this.commentFormData.push(value)

      }
    )
  }


  viewComment(id) {
    const dialogRef = this.dialog.open(ViewCommentsUsersComponent, {
      data: {
        id: id,
        formModeDialog: 3
      }
    })
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }
  deleteComment(id) {

    const dialogRef = this.dialog.open(ViewCommentsUsersComponent, {
      data: {
        id: id,
        formModeDialog: 4
      }
    })
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }
  confirmComment(id) {
    const dialogRef = this.dialog.open(ViewCommentsUsersComponent, {
      data: {
        id: id,
        formModeDialog: 1
      }
    })
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }
  rejectComment(id) {

    const dialogRef = this.dialog.open(ViewCommentsUsersComponent, {
      data: {
        id: id,
        formModeDialog: 2
      }
    })
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }

  sourceTable() {
    this.isLoading = true;
    this.subjectManagerServices.sortingAllComment(
      this.paginator.pageIndex + 1, this.paginator.pageSize,this.id).subscribe(
      (res) => {
        this.dataSource.data = res.body;
        this.totalElements = Number(res.headers.get('X-Total-Count')) - 1;
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
      return this.translate.instant('form.awaiting-confirmation')
    } else if (title === 1){
      return this.translate.instant('form.confirm-comment')
    }else if (title === 2){
      return this.translate.instant('form.reject-comment')
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  sortData(event: Sort) {
    this.subjectManagerServices.sortingCellComment(event.active, event.direction,this.id).subscribe(
      value => {
        this.dataSource.data = value
      }
    )
  }
}
