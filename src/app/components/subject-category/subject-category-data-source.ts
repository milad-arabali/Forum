import {CollectionViewer, DataSource, SelectionChange} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {map} from 'rxjs/operators';
import {SubjectCategoryFlatNodeModel} from "../../shared/model/subject-category-flat-node.model";
import {SubjectCategoryService} from "./shared/services/subject-category.service";



/**
 * subject category tree data source
 */
export class SubjectCategoryDataSource implements DataSource<SubjectCategoryFlatNodeModel> {
  dataChange = new BehaviorSubject<SubjectCategoryFlatNodeModel[]>([]);

  constructor(
    private _treeControl: FlatTreeControl<SubjectCategoryFlatNodeModel>,
    private subjectCategoryService: SubjectCategoryService,
  ) {
  }

  get data(): SubjectCategoryFlatNodeModel[] {
    return this.dataChange.value;
  }

  set data(value: SubjectCategoryFlatNodeModel[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<SubjectCategoryFlatNodeModel[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<SubjectCategoryFlatNodeModel>).added ||
        (change as SelectionChange<SubjectCategoryFlatNodeModel>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<SubjectCategoryFlatNodeModel>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<SubjectCategoryFlatNodeModel>) {
    if (change.added.length > 0) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed.length > 0) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: SubjectCategoryFlatNodeModel, expand: boolean) {
    this.subjectCategoryService.findByParentId(node.item.id).subscribe(result => {
      const children = result;
      const index = this.data.indexOf(node);
      if (!children || index < 0) {
        // If no children, or cannot find the node, no op
        return;
      }

      node.isLoading = true;
      setTimeout(() => {
        if (expand) {
          const nodes = children.map(
            name => new SubjectCategoryFlatNodeModel(name, node.level + 1, true),
          );

          this.data.splice(index + 1, 0, ...nodes);
        } else {
          let count = 0;
          for (
            let i = index + 1;
            i < this.data.length && this.data[i].level > node.level;
            i++, count++
          ) {
          }
          this.data.splice(index + 1, count);
        }

        // notify the change
        this.dataChange.next(this.data);
        node.isLoading = false;
      }, 1000);
      console.log("dsdsdsds")
    });
  }
}
