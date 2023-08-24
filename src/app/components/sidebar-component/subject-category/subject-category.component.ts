import {Component, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {SubjectCategoryFlatNodeModel} from "./model/subject-category-flat-node.model";
import {SubjectCategoryDataSource} from "./subject-category-data-source";
import {SubjectCategoryService} from "../services/subject-category.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteSubjectCategoryComponent} from "./delete-subject-category/delete-subject-category.component";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-subject-category-module',
  templateUrl: './subject-category.component.html',
  styleUrls: ['./subject-category.component.css']
})
export class SubjectCategoryComponent implements OnInit {
  disableButton:boolean;
  showButton: boolean = true;
  id: number;
  editSubjectCategory:boolean;
  treeControl: FlatTreeControl<SubjectCategoryFlatNodeModel>;
  dataSource: SubjectCategoryDataSource;
  activeNode: SubjectCategoryFlatNodeModel;
  getLevel = (node: SubjectCategoryFlatNodeModel) => node.level;
  isExpandable = (node: SubjectCategoryFlatNodeModel) => true;
  hasChild = (_: number, _nodeData: SubjectCategoryFlatNodeModel) => _nodeData.item.hasChild;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

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
    this.subjectCategoryService.selectParentId$.next(0)

    this.subjectCategoryService.editSubject$.next(false)
    this.subjectCategoryService.addSubject$.next(false)
    this.subjectCategoryService.showSubject$.next(false)

  }

  /**
   * select node
   * @param node tree node
   */
  selectNode(node: SubjectCategoryFlatNodeModel) {

    if (this.activeNode && this.activeNode.item.id === node.item.id) {
      this.activeNode = undefined;
      // this.showButton=true;
      this.subjectCategoryService.selectParentId$.unsubscribe()
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
      this.subjectCategoryService.deleteSubject.next(node.item.id)
      this.subjectCategoryService.selectParentId$.next(node.item.id)
    }

  }

  deleteSubject() {
    const dialogRef = this.dialog.open(DeleteSubjectCategoryComponent)
    dialogRef.afterClosed()
    console.log("delete",this.id)
  }

  onContextMenu(event : MouseEvent, node) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  editSubject() {
    this.subjectCategoryService.editSubject$.next(true)
  }

  addSubject() {
    this.subjectCategoryService.addSubject$.next(true)
  }

  showSubject() {
    this.subjectCategoryService.showSubject$.next(true)
  }
}
