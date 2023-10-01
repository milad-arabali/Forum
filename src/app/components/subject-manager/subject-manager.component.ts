import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectSubjectComponent} from "./select-subject/select-subject.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DateAdapter} from "@angular/material/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SubjectService} from "./shared/services/subject.service";
import {SubjectMangerModel} from "../../shared/model/subject-manger.model";
import {DeleteSubjectComponent} from "./delete-subject/delete-subject.component";
import {CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatMenuTrigger} from "@angular/material/menu";


@Component({
  selector: 'app-subject-manager',
  templateUrl: './subject-manager.component.html',
  styleUrls: ['./subject-manager.component.css']
})
export class SubjectManagerComponent implements  OnInit {
  form: FormGroup;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: string[] = ['id', 'title', 'categoryTitle', 'creatorUser', 'createDateTime', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  search: string;
  isLoading = false;
  pageSize = 0;
  currentPage = 5;
  totalElements = 0;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition= {x: '0px', y: '0px'}
  constructor(private Fb: FormBuilder,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>,
              public subject: SubjectService,
              private translate: TranslateService,
              private router: Router,
              private api: ApiService,
              private cookie: CookieService,
              private snack:MatSnackBar
  ) {
    this.form = this.Fb.group({
      title: [, [Validators.required, Validators.maxLength(255),
        Validators.pattern('^[0-9a-zA-Z\u0600-\u06FF\\s\\.\\,\\-\\(\\)\\:\\?]+$')]],
      parentId: [],
      parentTitle: [],
      status: [],
      createDateTime: [],
      creatorUser: [],
    })
    this.dateAdapter.setLocale('fa-IR');
  }

  ngOnInit() {
    setTimeout(() => {
      this.sourceTable()
      // this.dataSource.paginator = this.paginator;
    }, 100)
    this.checkAdmin()
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  changePagination(event: PageEvent){
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sourceTable()
  }
  // loadTable() {
  //   this.userDataService.getAllUsersPaginate(this.currentPage + 1, this.pageSize)
  //     .subscribe(value => {
  //       // @ts-ignore
  //       this.dataSource.data = value.body.filter(user => user.userName !== this.cookie.get('username'))
  //       this.totalElements = Number(value.headers.get('X-Total-Count')) - 1;
  //     })
  // }
  sourceTable() {
    this.isLoading = true;
    this.subject.sorting(this.paginator.pageIndex + 1, this.paginator.pageSize).subscribe(
      (res) => {
        this.dataSource.data = res.body;
        this.isLoading = false;
        this.totalElements = Number(res.headers.get('X-Total-Count')) - 1;
      },
      (err) => {
        console.log("ok");
        // alert("Kolla nätverksanslutnignen(CORS)");
      },
      () => console.log('done a lot  with news!')
    );
  }

  selectCategory() {
    const dialogRef = this.dialog.open(SelectSubjectComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.form.controls['parentId'].setValue(result.id)
      this.form.controls['parentTitle'].setValue(result.title)
      this.api.getSubjectCategory(result.id).subscribe(
        value => {
          if (value.status === false) {
            this.snack.open(this.translate.instant('form.category-parent-status'), "", {
              duration: 3000,
              horizontalPosition: "end",
              verticalPosition: "top"
            })
            this.form.controls['parentTitle'].setValue('')
          }
        })
    })
  }
  onContextMenu(event: MouseEvent, item: SubjectMangerModel): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item};
    // @ts-ignore
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
  formReset() {
    this.form.reset()
    this.sourceTable()
  }

  searchObject() {
    let time = this.form.controls['createDateTime'].value
    // console.log(this.form.getRawValue())
    let searchModel = new SubjectMangerModel();
    searchModel = this.form.getRawValue();
    // console.log(searchModel)
    let title = '';
    let parentId = '';
    let status = '';
    let creatorUser = '';
    let createDateTime = '';
    if (searchModel.parentId) {
      parentId = `parentId=${searchModel.parentId}`
    } else {
      parentId = `&`
    }
    if (searchModel.title) {
      title = `title_like=${searchModel.title}`
    } else {
      title = `&`
    }
    if (searchModel.creatorUser) {
      creatorUser = `creatorUser_like=${searchModel.creatorUser}`
    } else {
      creatorUser = `&`
    }
    if (time) {
      time = time._d;
      time = time.toISOString().substr(0, time.toISOString().indexOf('T'));
      createDateTime = `createDateTime_like=${time}`

    } else {
      createDateTime = `&`
    }
    if (searchModel.status) {
      status = `status=${searchModel.status}`
    } else {
      status = `&`
    }
    this.search = `${parentId}&${title}&${creatorUser}&${createDateTime}&${status}`
    // console.log(this.search)
    this.subject.findSubject(this.search).subscribe(
      value => {
        // console.log(value);
        this.dataSource.data = value
      })
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
  checkAdmin() {
    let isAdmin;
    this.api.getIsAdmin(this.cookie.get('users')).subscribe(
      value => {
        isAdmin = value[0].isAdmin
        if (isAdmin) {
          console.log("true")
        } else {
          this.router.navigate(['/home'])
        }
      }
    )
  }
  deleteSubject(id: number) {

    const dialogRef = this.dialog.open(DeleteSubjectComponent, {
      data: {
        id: id
      }
    })
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }

  changeStatusTitle(title: boolean) {
    if (title) {
      return this.translate.instant('form.status-true')
    } else {
      return this.translate.instant('form.status-false')
    }
  }

  pageChanged(event: PageEvent) {
    console.log({event});
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.sourceTable();
  }

  // getPageSizeOptions(): number[] {
  //   if (this.dataSource.data.length > this.maxall) {
  //     return [3, 5, this.dataSource.data.length];
  //   } else {
  //     return [3, 5, this.maxall];
  //   }
  // }

  sortData(event: Sort) {
    this.subject.sortingCell(event.active, event.direction).subscribe(
      value => {
        this.dataSource.data = value
      }
    )
  }
  resetDateOfBirth() {
    this.form.controls['createDateTime'].reset()
  }
}
