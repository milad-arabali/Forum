import {Component, OnInit} from '@angular/core';
import {SubjectCategoryService} from "../../subject-category/shared/services/subject-category.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {FlatTreeControl} from "@angular/cdk/tree";
import {SubjectCategoryFlatNodeModel} from "../../../shared/model/subject-category-flat-node.model";
import {SubjectCategoryDataSource} from "../../subject-category/subject-category-data-source";
import {SubjectCategoryModel} from "../../../shared/model/subject-category.model";

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit{
  id: number;
  treeControl: FlatTreeControl<SubjectCategoryFlatNodeModel>;
  dataSource: SubjectCategoryDataSource;
  activeNode: SubjectCategoryFlatNodeModel;
  getLevel = (node: SubjectCategoryFlatNodeModel) => node.level;
  isExpandable = (node: SubjectCategoryFlatNodeModel) => true;
  hasChild = (_: number, _nodeData: SubjectCategoryFlatNodeModel) => _nodeData.item.hasChild;
  selectParentBtn: Boolean = false;

  constructor(private subjectCategoryService: SubjectCategoryService,
            private route: Router,
            private dialogRef: MatDialogRef<SelectCategoryComponent>) {
    this.treeControl = new FlatTreeControl<SubjectCategoryFlatNodeModel>(this.getLevel, this.isExpandable);
    this.dataSource = new SubjectCategoryDataSource(this.treeControl, subjectCategoryService);
}
  ngOnInit() {
    this.loadTree()
  }
  loadTree() {
    setTimeout(()=>{
      this.subjectCategoryService.findByParentId(-1).subscribe(result => {
        this.dataSource.data = result.map(item => new SubjectCategoryFlatNodeModel
        (item, 0, true, false));
      });
    },10)
  }
  /**
   * select node
   * @param node tree node
   */
  selectNode(node: SubjectCategoryFlatNodeModel) {
    if (this.activeNode && this.activeNode.item.id === node.item.id) {
      this.activeNode = undefined;
      this.selectParentBtn = false;
    } else {
      this.activeNode = node;
      this.id = node.item.id;
      this.selectParentBtn = true;


    }

  }

  selectParentClose() {
    const s = new SubjectCategoryModel();
    s.id = -1
    this.dialogRef.close(s)

  }

  selectParent() {
    const s = new SubjectCategoryModel();
    s.title = this.activeNode.item.title
    s.id = this.activeNode.item.id
    // console.log("id:", this.id)
    this.dialogRef.close(s)
  }
}
