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





@Component({
  selector: 'app-subject-manager',
  templateUrl: './subject-manager.component.html',
  styleUrls: ['./subject-manager.component.css']
})
export class SubjectManagerComponent implements AfterViewInit,OnInit {
  form: FormGroup;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  displayedColumns: string[] = ['id', 'title', 'categoryTitle', 'creatorUser', 'createDateTime', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  search: string;
  isLoading = false;
  pageSize = 0;
  currentPage = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  maxall=100;

  constructor(private Fb: FormBuilder,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>,
              public subject: SubjectService,
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
    setTimeout(()=>{
      this.sourceTable()
      this.dataSource.paginator = this.paginator;
    },100)

    this.subject.deleteSubjectGrid.next(0)

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  sourceTable() {
    this.isLoading = true;
    this.subject.sorting(this.paginator.pageIndex+1,this.paginator.pageSize).subscribe(
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
    // this.subject.checkId().subscribe(
    //   (res) => {
    //
    //     this.dataSource.data = res;
    //     this.isLoading = false;
    //   },
    //   (err) => {
    //     console.log("ok");
    //     // alert("Kolla nätverksanslutnignen(CORS)");
    //   },
    //   () => console.log('done a lot  with news!')
    // );

    // this.isLoading = true;
    // let URL = `http://localhost:3000/subject?_page=${this.currentPage}&_prev=${this.pageSize}`;
    // fetch(URL)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.dataSource.data = data.rows;
    //     setTimeout(() => {
    //       this.paginator.pageIndex = this.currentPage;
    //       this.paginator.length = data.count;
    //     });
    //     this.isLoading = false;
    //   }, error => {
    //     console.log(error);
    //     this.isLoading = false;
    //   });
  }
  selectCategory() {
    const dialogRef = this.dialog.open(SelectSubjectComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.form.controls['parentId'].setValue(result.id)
      this.form.controls['parentTitle'].setValue(result.title)
    })
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
      creatorUser = `creatorUser=${searchModel.creatorUser}`
    } else {
      creatorUser = `&`
    }
    if (time) {
      createDateTime = `createDateTime=${time.format('YYYY/MM/DD')}`
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
  deleteSubject(id: number) {
    this.subject.deleteSubjectGrid.next(id)
    const dialogRef = this.dialog.open(DeleteSubjectComponent, {})
    dialogRef.afterClosed().subscribe(result => {
        this.sourceTable()
      }
    )
  }
  changeStatusTitle(title: boolean) {
    if (title) {
      return 'فعال'
    } else {
      return "غیرفعال"
    }
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
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

  sortData(event: Sort) {
    this.subject.sortingCell(event.active,event.direction).subscribe(
      value => {
        this.dataSource.data=value
      }
    )
  }

}
