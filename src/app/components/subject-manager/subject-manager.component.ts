import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectSubjectComponent} from "./select-subject/select-subject.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DateAdapter} from "@angular/material/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
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

  previousIndex: number;
  displayedColumns: string[] = ['id', 'title','categoryTitle', 'creatorUser', 'createDateTime', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  search:string;
  constructor(private Fb: FormBuilder,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>,
              private subject: SubjectService,

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
    this.sourceTable()
    this.subject.deleteSubjectGrid.next(0)
  }

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  sourceTable(){
    this.subject.checkId().subscribe(
      (res) => {
        this.dataSource.data=res;
      },
      (err) => { console.log(err); alert("Kolla nätverksanslutnignen(CORS)"); },
      () => console.log('done a lot  with news!')
    );

  }
  selectCategory()
  {
    const dialogRef = this.dialog.open(SelectSubjectComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.form.controls['parentId'].setValue(result.id)
      this.form.controls['parentTitle'].setValue(result.title)
    })
  }

  formReset()
  {
    this.form.reset()
    this.sourceTable()
  }

  searchObject() {
    console.log(this.form.getRawValue())
    let searchModel=new SubjectMangerModel();
    searchModel=this.form.getRawValue();
    console.log(searchModel)
    let title='';
    let parentId='';
    let status='';
    let creatorUser='';
    let createDateTime='';
    if(searchModel.parentId){
      parentId=`parentId=${searchModel.parentId}`
    }else {
      parentId=`&`
    }
    if(searchModel.title){
      title=`title=${searchModel.title}`
    }else {
      title=`&`
    }
    if(searchModel.creatorUser){
      creatorUser=`creatorUser=${searchModel.creatorUser}`
    }else {
      creatorUser=`&`
    }
    if(searchModel.createDateTime){
      createDateTime=`createDateTime=${searchModel.createDateTime}`

    }else {
      createDateTime=`&`
    }
    if(searchModel.status){
      status=`status=${searchModel.status}`

    }else {
      status=`&`
    }
    this.search= `${parentId}&${title}&${creatorUser}&${createDateTime}&${status}`
    // console.log(this.search)
    this.subject.findSubject(this.search).subscribe(
      value =>{
        // console.log(value);
        this.dataSource.data=value




    })

  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
  deleteSubject(id:number) {
    this.subject.deleteSubjectGrid.next(id)
    const dialogRef = this.dialog.open(DeleteSubjectComponent, {})
    dialogRef.afterClosed().subscribe(result=>{
      this.sourceTable()
      }

    )

  }

}
