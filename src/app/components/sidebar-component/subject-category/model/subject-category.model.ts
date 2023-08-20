export interface SubjectCategoryModel {
  id:number;
  parentId: number;
  title: string;
  createDateTime: Date;
  status: boolean;
  priority: number;
  hasChild?: boolean;
}
