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
import {checkNationalCode} from "../../shared/directive/natonal-code-validator.directive";
import {UserAccountInformationModel} from "../../shared/model/user-account-information.model";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {DeleteSubjectComponent} from "../subject-manager/delete-subject/delete-subject.component";
import {DeleteUsersComponent} from "./delete-users/delete-users.component";

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit, AfterViewInit {
  @ViewChild("userName") private _inputElement: ElementRef;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  gender: string[] = ['مرد', 'زن']
  isAdmin: boolean[] = [true, false]
  filterUsersForm: FormGroup;
  displayedColumns: string[] =
    ['id', 'userName', 'name', 'nameFamily', 'nationalCode', 'gender', 'DateOfBirth', 'status', 'isAdmin', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  pageSize = 0;
  currentPage = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  status = [
    {statusValue: 'Registered', viewValue: 'ثبت نام اولیه شده'},
    {statusValue: 'reject', viewValue: 'لغو شده'},
    {statusValue: 'confirm', viewValue: 'تایید شده'},
  ];
  maxall = 100;
  search:string;
  constructor(private router: ActivatedRoute,
              private userManagerServices: UsersManageService,
              private fb: FormBuilder,
              private api: ApiService,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private route: Router,
              private activateRoute: ActivatedRoute,
              private dateAdapter: DateAdapter<any>,
  ) {
    this.dateAdapter.setLocale('fa-IR');
    this.filterUsersForm = this.fb.group({
      userName: [, [
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-Z0-9\-\_\/]+$')]],
      status: [,],
      name: [, [Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nameFamily: [, [Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nationalCode: [, [Validators.minLength(10), Validators.maxLength(10),
        checkNationalCode()]],
      gender: [, []],
      isAdmin: [, []],
      DateOfBirth: [, []]
    })
  }
  ngOnInit() {
    setTimeout(() => {
      this.sourceTable()
      this.dataSource.paginator = this.paginator;
    }, 100)
    this.sourceTable()
    this.userManagerServices.deleteUsersGrid.next(0)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  sourceTable() {
    this.isLoading = true;
    this.userManagerServices.UsersSorting(this.paginator.pageIndex + 1, this.paginator.pageSize).subscribe(
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

  formReset() {
    this.filterUsersForm.reset();
    this.sourceTable()
  }

  searchUsers() {
    let time = this.filterUsersForm.controls['DateOfBirth'].value
    // console.log(this.form.getRawValue())
    let searchModel = new UserAccountInformationModel()
    searchModel = this.filterUsersForm.getRawValue();
    console.log(searchModel)
    let userName = '';
    let name = '';
    let nameFamily = '';
    let status = '';
    let nationalCode = '';
    let gender = '';
    let isAdmin = '';
    let DateOfBirth = '';

    if (searchModel.userName) {
      userName = `userName=${searchModel.userName}`
    } else {
      userName = `&`
    }
    if (searchModel.name) {
      name = `name_like=${searchModel.name}`
    } else {
      name = `&`
    }
    if (searchModel.nameFamily) {
      nameFamily = `nameFamily=${searchModel.nameFamily}`
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
    if (searchModel.isAdmin) {
      isAdmin = `isAdmin=${searchModel.isAdmin}`
    } else {
      isAdmin = `isAdmin=false`
    }
    if (time) {
      DateOfBirth = `createDateTime=${time.format('YYYY/MM/DD')}`
    } else {
      DateOfBirth = `&`
    }
    this.search = `${userName}&${name}&${nameFamily}&${status}&${nationalCode}&${gender}&${isAdmin}&${DateOfBirth}`
    console.log(this.search)
    this.userManagerServices.findUser(this.search).subscribe(
      value => {
        // console.log(value);
        this.dataSource.data = value
      })
  }

  pageChanged(event: PageEvent) {
    console.log({event});
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.sourceTable();
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
    // this.subject.sortingCell(event.active,event.direction).subscribe(
    //   value => {
    //     this.dataSource.data=value
    //   }
    // )
  }

  usersStatus(status: string) {
    if (status === 'Registered') {
      return 'ثبت نام اولیه'
    } else if (status === 'confirm') {
      return "تایید شده"
    } else {
      return "لغو شده"
    }
  }

  isAdminUsersStatus(status: Boolean) {
    if (status === true) {
      return "بلی"
    } else {
      return "خیر"
    }
  }



  deleteUsers(id) {
    this.userManagerServices.deleteUsersGrid.next(id)
    const dialogRef = this.dialog.open(DeleteUsersComponent, {})
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }
}
