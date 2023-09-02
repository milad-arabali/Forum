import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {SubjectCategoryFlatNodeModel} from "../../shared/model/subject-category-flat-node.model";
import {SubjectCategoryDataSource} from "./subject-category-data-source";
import {SubjectCategoryService} from "./subject-category.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteSubjectCategoryComponent} from "./delete-subject-category/delete-subject-category.component";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-subject-category-module',
  templateUrl: './subject-category.component.html',
  styleUrls: ['./subject-category.component.css']
})
export class SubjectCategoryComponent implements OnInit  {
  contextmenu:boolean=true;
  showButton: boolean = true;
  id: number;
  treeControl: FlatTreeControl<SubjectCategoryFlatNodeModel>;
  dataSource: SubjectCategoryDataSource;
  activeNode: SubjectCategoryFlatNodeModel;
  getLevel = (node: SubjectCategoryFlatNodeModel) => node.level;
  isExpandable = (node: SubjectCategoryFlatNodeModel) => true;
  hasChild = (_: number, _nodeData: SubjectCategoryFlatNodeModel) => _nodeData.item.hasChild;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};
  constructor(private subjectCategoryService: SubjectCategoryService,
              private router: Router,
              private dialog: MatDialog,
              private snack:MatSnackBar) {
    this.treeControl = new FlatTreeControl<SubjectCategoryFlatNodeModel>(this.getLevel, this.isExpandable);
    this.dataSource = new SubjectCategoryDataSource(this.treeControl, subjectCategoryService);
  }

  ngOnInit() {
    this.loadTree()
    this.subjectCategoryService.selectParentId$.next(0)
    this.id=0;
    this.contextmenu=true;
  }

  /**
   * select node
   * @param node tree node
   */
  selectNode(node: SubjectCategoryFlatNodeModel) {
    if (this.activeNode && this.activeNode.item.id === node.item.id) {
      this.activeNode = undefined;
      this.subjectCategoryService.deleteSubject.next(0)
      this.showButton=true;
      this.id =0
      this.contextmenu=true;
    } else {
      this.activeNode = node;
      this.showButton=false;
      this.subjectCategoryService.deleteSubject.next(node.item.id)
      this.id = node.item.id
      this.contextmenu=false;
    }
  }
  loadTree() {
    setTimeout(()=>{
      this.subjectCategoryService.findByParentId(-1).subscribe(result => {
        this.dataSource.data = result.map(item => new SubjectCategoryFlatNodeModel
        (item, 0, true, false));
      });
    },100)
  }

  deleteSubject()  {
    if (this.activeNode.item.hasChild === true) {
      this.snack.open("دسته بندی مورد نظر دارای فرزند است.", "", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    }else {
      const dialogRef = this.dialog.open(DeleteSubjectCategoryComponent, {})
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(()=>{
          this.loadTree()
        },100)
        this.id = 0;
        this.showButton=true;
      })
    }
  }
  onContextMenu(event: MouseEvent, node) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
  navigateAdd() {
    if(this.id){
      this.router.navigate(['/subject-category/add',this.id])
    }else {
      this.router.navigate(['/subject-category/add'])
    }
  }
}
