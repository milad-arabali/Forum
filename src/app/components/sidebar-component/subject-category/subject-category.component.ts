import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {SubjectCategoryFlatNodeModel} from "../model/subject-category-flat-node.model";
import {SubjectCategoryDataSource} from "./subject-category-data-source";
import {SubjectCategoryService} from "../services/subject-category.service";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-subject-category',
  templateUrl: './subject-category.component.html',
  styleUrls: ['./subject-category.component.css']
})
export class SubjectCategoryComponent implements OnInit {
  showButton: boolean = true;
  id: number;
  treeControl: FlatTreeControl<SubjectCategoryFlatNodeModel>;
  dataSource: SubjectCategoryDataSource;
  activeNode: SubjectCategoryFlatNodeModel;

  constructor(private subjectCategoryService: SubjectCategoryService,
             private router:Router) {
    this.treeControl = new FlatTreeControl<SubjectCategoryFlatNodeModel>(this.getLevel, this.isExpandable);
    this.dataSource = new SubjectCategoryDataSource(this.treeControl, subjectCategoryService);
  }

  getLevel = (node: SubjectCategoryFlatNodeModel) => node.level;
  isExpandable = (node: SubjectCategoryFlatNodeModel) => true;
  hasChild = (_: number, _nodeData: SubjectCategoryFlatNodeModel) => _nodeData.item.hasChild;

  ngOnInit() {
    this.subjectCategoryService.findByParentId(-1).subscribe(result => {
      this.dataSource.data = result.map(item => new SubjectCategoryFlatNodeModel(item, 0, true, false));
      this.subjectCategoryService.Id$.subscribe(
       a=> {
         if(a){
           this.id=a
         }
       }
     )
    });
  }

  /**
   * select node
   * @param node tree node
   */
  selectNode(node: SubjectCategoryFlatNodeModel) {

    if (this.activeNode && this.activeNode.item.id === node.item.id) {
      this.activeNode = undefined;
      this.showButton=true;



    } else {
      this.activeNode = node;
      this.showButton=false;
      this.subjectCategoryService.findId(node.item.id)
      this.subjectCategoryService.Id$.next(node.item.id)
    }
  }
  edit(id:number){
    this.router.navigate(['/edit',id])
  }

}
