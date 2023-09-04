import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SelectSubjectComponent} from "./select-subject/select-subject.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DateAdapter} from "@angular/material/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

class SubjectManagerModel {
}

@Component({
  selector: 'app-subject-manager',
  templateUrl: './subject-manager.component.html',
  styleUrls: ['./subject-manager.component.css']
})
export class SubjectManagerComponent implements AfterViewInit {
  form: FormGroup;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  data: SubjectManagerModel[] = [
    {id: 1, title: 'Hydrogen', categoryId: 1, status: 'H', createDateTime: ' d', creatorUser: true},
    {id: 2, title: 'Helium', categoryId: 4, status: 'He', createDateTime: ' d', creatorUser: true},
    {id: 3, title: 'Lithium', categoryId: 6, status: 'Li', createDateTime: ' d', creatorUser: true},
    {id: 4, title: 'Beryllium', categoryId: 9, status: 'Be', createDateTime: ' d', creatorUser: true},
    {id: 5, title: 'Boron', categoryId: 10, status: 'B', createDateTime: ' d', creatorUser: true},
    {id: 6, title: 'Carbon', categoryId: 12, status: 'C', createDateTime: ' d', creatorUser: true},
    {id: 7, title: 'Nitrogen', categoryId: 14, status: 'N', createDateTime: ' d', creatorUser: true},
    {id: 8, title: 'Oxygen', categoryId: 15, status: 'O', createDateTime: ' d', creatorUser: true},
    {id: 9, title: 'Fluorine', categoryId: 18, status: 'F', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
    {id: 10, title: 'Neon', categoryId: 20, status: 'Ne', createDateTime: ' d', creatorUser: true},
  ];
  displayedColumns: string[] = ['id', 'categoryId', 'title', 'createDateTime','creatorUser','status','actions'];
  dataSource = new MatTableDataSource(this.data);
  loading = false;

  constructor(private Fb: FormBuilder,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>) {
    this.form = this.Fb.group({
      title: ['', [Validators.required, Validators.maxLength(255),
        Validators.pattern('^[0-9a-zA-Z\u0600-\u06FF\\s\\.\\,\\-\\(\\)\\:\\?]+$')]],
      parentId: [''],
      parentTitle: [''],
      status: [],
      createDateTime: [],
      creatorUser: [],
    })
    this.dateAdapter.setLocale('fa-IR');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  selectCategory() {
    const dialogRef = this.dialog.open(SelectSubjectComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.form.controls['parentId'].setValue(result.id)
      this.form.controls['parentTitle'].setValue(result.title)
      // if (this.form.controls['parentTitle'].value === this.form.controls['title'].value) {
      //   this.snack.open("والد یک دسته بندی موضوع نمی تواند خودش باشد.", "", {
      //     duration: 3000,
      //     horizontalid: "end",
      //     verticalid: "top"
      //   })
      //   this.form.controls['parentTitle'].setValue('')
      //   // this.form.setErrors({Invalid:true})
      // }
    })
  }

  formReset() {
    this.form.reset()
  }
}
