import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersManageService} from "./shared/services/users-manage.service";
import {ApiService} from "../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DateAdapter} from "@angular/material/core";
import {UserAccountInformationModel} from "../../shared/model/user-account-information.model";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";
import {ManageAccessUsersComponent} from "./manage-access-users/manage-access-users.component";
import {MenuItem} from "primeng/api";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {
  @ViewChild("userName") private _inputElement: ElementRef;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  // @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  gender: string[] = ['مرد', 'زن']
  isAdmin: boolean[] = [true, false]
  filterUsersForm: FormGroup;
  displayedColumns: string[] =
    ['id', 'userName', 'name', 'nameFamily', 'nationalCode', 'gender', 'DateOfBirth', 'status', 'isAdmin', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  status = [
    {statusValue: 'Registered', viewValue: 'ثبت نام اولیه شده'},
    {statusValue: 'reject', viewValue: 'لغو شده'},
    {statusValue: 'confirm', viewValue: 'تایید شده'},
    {statusValue: '', viewValue: 'هیچ کدام'},
  ];
  maxall = 100;
  search: string;
  isSearchButtonActive = false;
  minDate: Date;
  maxDate: Date;
  // contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};
  totalElements = 0;
  items: MenuItem[] | undefined;

  constructor(private router: ActivatedRoute,
              private userManagerServices: UsersManageService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private activateRoute: ActivatedRoute,
              private dateAdapter: DateAdapter<any>,
              private cookie: CookieService,
              private translate: TranslateService
  ) {
    this.dateAdapter.setLocale('fa-IR');
    this.filterUsersForm = this.fb.group({
      userName: [],
      status: ['',],
      name: [, [Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nameFamily: [, [Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nationalCode: [, [Validators.minLength(10), Validators.maxLength(10),
        Validators.maxLength(10)]],
      gender: [, []],
      isAdmin: [, []],
      DateOfBirth: [,]
    })
  }

  ngOnInit() {
    this.minDate = new Date(1990, 0, 1);
    this.maxDate = new Date(2016, 0, 1);
    // this.userManagerServices.checkIsAdmin(this.cookie.get('users'))
    setTimeout(() => {
      this.sourceTable()
      // this.dataSource.paginator = this.paginator;
    }, 100)
    // this.sourceTable()
    this.checkAdmin()
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file'
      }]
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  changePagination(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sourceTable()
  }

  sourceTable() {
    this.isLoading = true;
    this.userManagerServices.UsersSorting(this.paginator.pageIndex + 1, this.paginator.pageSize).subscribe(
      (res) => {
        this.dataSource.data = res.body.filter(user => user.userName !== this.cookie.get('users'));
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

  formReset() {
    this.filterUsersForm.reset();
    this.sourceTable()
  }

  // onContextMenu(event: MouseEvent, item: UserAccountInformationModel): void {
  //   event.preventDefault();
  //   this.contextMenuPosition.x = event.clientX + 'px';
  //   this.contextMenuPosition.y = event.clientY + 'px';
  //   this.contextMenu.menuData = {item};
  //   // @ts-ignore
  //   this.contextMenu.menu.focusFirstItem('mouse');
  //   this.contextMenu.openMenu();
  // }

  searchUsers() {
    let time = this.filterUsersForm.controls['DateOfBirth'].value
    let user = this.filterUsersForm.controls['userName'].value
    // console.log(this.form.getRawValue())
    let searchModel = new UserAccountInformationModel()
    searchModel = this.filterUsersForm.getRawValue();
    // console.log(searchModel)
    let userName = '';
    let name = '';
    let nameFamily = '';
    let status = '';
    let nationalCode = '';
    let gender = '';
    let isAdmin = '';
    let DateOfBirth = '';

    if (user) {
      // console.log("c", user);
      userName = `userName_like=${user}`
    } else {
      userName = `&`
    }
    if (searchModel.name) {
      name = `name_like=${searchModel.name}`
    } else {
      name = `&`
    }
    if (searchModel.nameFamily) {
      nameFamily = `nameFamily_like=${searchModel.nameFamily}`
    } else {
      nameFamily = `&`
    }
    if (searchModel.status) {
      status = `status=${searchModel.status}`
    } else {
      status = `&`
    }
    if (searchModel.nationalCode) {
      nationalCode = `nationalCode=${searchModel.nationalCode}`
    } else {
      nationalCode = `&`
    }
    if (searchModel.gender) {
      if (searchModel.gender === 'مرد') {
        gender = `gender=male`
      } else if (searchModel.gender === 'زن') {
        gender = `gender=female`
      } else {
        gender = `&`
      }
    }
    if (searchModel.isAdmin===true) {

      isAdmin = `isAdmin=true`
    }else if (searchModel.isAdmin==false){
      isAdmin = `isAdmin=false`
    }else {
      isAdmin = `&`
    }


    if (time) {
      // time = time._d;
      // time = time.toISOString().substr(0, time.toISOString().indexOf('T'));
      DateOfBirth = `DateOfBirth_like=${formatDate(time, 'yyyy-MM-dd', 'en-US')}`
    } else {
      DateOfBirth = `&`
    }
    this.search = `${userName}&${name}&${nameFamily}&${status}&${nationalCode}&${gender}&${isAdmin}&${DateOfBirth}`
    // console.log(this.search)
    this.userManagerServices.UsersSorting(this.paginator.pageIndex + 1, this.paginator.pageSize, this.search).subscribe(
      (res) => {
        this.dataSource.data = res.body.filter(user => user.userName !== this.cookie.get('users'));
        this.isLoading = false;
        this.totalElements = Number(res.headers.get('X-Total-Count')) - 1;

      },
      (err) => {
        console.log("ok");
        // alert("Kolla nätverksanslutnignen(CORS)");
      },
      () => console.log('done a lot  with news!')
    );
    // this.userManagerServices.findUser(this.search).subscribe(
    //   value => {
    //     this.dataSource.data = value.filter(user=>user.userName!== this.cookie.get('users'));
    //     // console.log(value);
    //     // this.dataSource.data = value
    //   })
  }

  pageChanged(event: PageEvent) {
    // console.log({event});
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.sourceTable();
  }

  checkAdmin() {
    let isAdmin;
    this.api.getIsAdmin(this.cookie.get('users')).subscribe(
      value => {
        isAdmin = value[0].isAdmin
        if (isAdmin) {
          console.log("true")
        } else {
          this.route.navigate(['/home'])
        }
      }
    )
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > this.maxall) {
      return [3, 5, this.dataSource.data.length];
    } else {
      return [3, 5, this.maxall];
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  sortData(event: Sort) {
    this.userManagerServices.sortingCellUsers(this.paginator.pageIndex + 1, this.paginator.pageSize, event.active, event.direction).subscribe(
      value => {
        this.dataSource.data = value.body.filter(user => user.userName !== this.cookie.get('users'));
        this.totalElements = Number(value.headers.get('X-Total-Count')) - 1;
      }
    )
  }

  usersStatus(status: string) {
    if (status === 'Registered') {
      return this.translate.instant('form.register-users-title')
    } else if (status === 'confirm') {
      return this.translate.instant('form.confirm-users-title')
    } else {
      return this.translate.instant('form.reject-users-title')
    }
  }

  isAdminUsersStatus(status: Boolean) {
    if (status === true) {
      return this.translate.instant('form.true')
    } else if (status === false) {
      return this.translate.instant('form.false')
    }
  }


  deleteUsers(id) {
    const dialogRef = this.dialog.open(ManageAccessUsersComponent, {
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


  confirmUsers(id) {

    const dialogRef = this.dialog.open(ManageAccessUsersComponent, {
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

  rejectUsers(id) {
    const dialogRef = this.dialog.open(ManageAccessUsersComponent, {
      data: {
        id: id,
        formModeDialog: 7
      }
    })
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }

  toAdmin(id) {
    const dialogRef = this.dialog.open(ManageAccessUsersComponent, {
      data: {
        id: id,
        formModeDialog: 5
      }
    })
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }

  disAdmin(id) {
    const dialogRef = this.dialog.open(ManageAccessUsersComponent, {
      data: {
        id: id,
        formModeDialog: 6
      }
    })
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }

  resetDateOfBirth() {
    this.filterUsersForm.controls['DateOfBirth'].reset()
  }
}
