import {SubjectCategoryModel} from './subject-category.model';

/**
 * subject category flat node
 */
export class SubjectCategoryFlatNodeModel {
  constructor(
    public item: SubjectCategoryModel,
    public level = 1,
    public expandable = true,
    public isLoading = false
  ) {
  }
}
