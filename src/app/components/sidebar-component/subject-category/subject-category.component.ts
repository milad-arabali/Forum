import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {SubjectCategoryFlatNodeModel} from "../model/subject-category-flat-node.model";
import {SubjectCategoryDataSource} from "./subject-category-data-source";
import {SubjectCategoryService} from "../services/subject-category.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {LogOutComponent} from "../../user-panel/log-out/log-out.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteSubjectCategoryComponent} from "./delete-subject-category/delete-subject-category.component";

@Component({
  selector: 'app-subject-category',
  templateUrl: './subject-category.component.html',
  styleUrls: ['./subject-category.component.css']
})
export class SubjectCategoryComponent implements OnInit {
   disableButton:boolean;
  showButton: boolean = true;
  id: number;
  treeControl: FlatTreeControl<SubjectCategoryFlatNodeModel>;
  dataSource: SubjectCategoryDataSource;
  activeNode: SubjectCategoryFlatNodeModel;
  getLevel = (node: SubjectCategoryFlatNodeModel) => node.level;
  isExpandable = (node: SubjectCategoryFlatNodeModel) => true;
  hasChild = (_: number, _nodeData: SubjectCategoryFlatNodeModel) => _nodeData.item.hasChild;

  constructor(private subjectCategoryService: SubjectCategoryService,
              private router: Router,
              private dialog: MatDialog) {
    this.treeControl = new FlatTreeControl<SubjectCategoryFlatNodeModel>(this.getLevel, this.isExpandable);
    this.dataSource = new SubjectCategoryDataSource(this.treeControl, subjectCategoryService);
  }

  ngOnInit() {
    this.subjectCategoryService.findByParentId(-1).subscribe(result => {
      this.dataSource.data = result.map(item => new SubjectCategoryFlatNodeModel
      (item, 0, true, false));
      this.subjectCategoryService.Id$.subscribe(
        a => {
          if (a) {
            this.id = a
          }
        }
      )
    });

    this.subjectCategoryService.disableBtn$.subscribe(a=>{
      this.disableButton=a;
    })

  }

  /**
   * select node
   * @param node tree node
   */
  selectNode(node: SubjectCategoryFlatNodeModel) {

    if (this.activeNode && this.activeNode.item.id === node.item.id) {
      this.activeNode = undefined;
      // this.showButton=true;
      this.subjectCategoryService.showBtn$.next(true)
      this.subjectCategoryService.showBtn$.subscribe(a => {
        this.showButton = a
      })

    } else {
      this.activeNode = node;
      // this.showButton=false;
      this.subjectCategoryService.showBtn$.next(false)
      this.subjectCategoryService.showBtn$.subscribe(a => {
        this.showButton = a
      })
      this.subjectCategoryService.findId(node.item.id)
      this.subjectCategoryService.Id$.next(node.item.id)
    }
  }

  edit(id: number) {
    this.router.navigate(['/edit', id])
  }

  protected readonly console = console;

  deleteSubject() {
    const dialogRef = this.dialog.open(DeleteSubjectCategoryComponent)
    dialogRef.afterClosed()
  }
}
