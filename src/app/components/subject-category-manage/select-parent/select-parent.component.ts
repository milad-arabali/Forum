import {Component, OnInit} from '@angular/core';
import {SubjectCategoryFlatNodeModel} from "../../shared/model/subject-category-flat-node.model";
import {FlatTreeControl} from "@angular/cdk/tree";
import {SubjectCategoryDataSource} from "../subject-category/subject-category-data-source";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SubjectCategoryService} from "../subject-category/subject-category.service";

@Component({
  selector: 'app-select-parent-module',
  templateUrl: './select-parent.component.html',
  styleUrls: ['./select-parent.component.css']
})
export class SelectParentComponent implements OnInit {
  id: number;
  treeControl: FlatTreeControl<SubjectCategoryFlatNodeModel>;
  dataSource: SubjectCategoryDataSource;
  activeNode: SubjectCategoryFlatNodeModel;
  getLevel = (node: SubjectCategoryFlatNodeModel) => node.level;
  isExpandable = (node: SubjectCategoryFlatNodeModel) => true;
  hasChild = (_: number, _nodeData: SubjectCategoryFlatNodeModel) => _nodeData.item.hasChild;

  constructor(private subjectCategoryService: SubjectCategoryService,
              private route: Router,
              private dialogRef: MatDialogRef<SelectParentComponent>) {
    this.treeControl = new FlatTreeControl<SubjectCategoryFlatNodeModel>(this.getLevel, this.isExpandable);
    this.dataSource = new SubjectCategoryDataSource(this.treeControl, subjectCategoryService);
  }

  ngOnInit() {
    this.subjectCategoryService.findByParentId(-1).subscribe(result => {
      this.dataSource.data = result.map(item => new SubjectCategoryFlatNodeModel
      (item, 0, true, false));

    });
  }

  /**
   * select node
   * @param node tree node
   */
  selectNode(node: SubjectCategoryFlatNodeModel) {

    if (this.activeNode && this.activeNode.item.id === node.item.id) {
      this.activeNode = undefined;
      this.subjectCategoryService.selectParentId$.unsubscribe()
    } else {
      this.activeNode = node;
      this.id=node.item.id



    }

  }

  selectParentClose() {
    this.route.navigate(['/subject-category/add'])
    this.dialogRef.close()
  }

  selectParent() {
    this.subjectCategoryService.selectParentId$.next(this.id)
    console.log("id:",this.id)
    this.route.navigate(['/subject-category/add'])
    this.dialogRef.close()
  }


}
