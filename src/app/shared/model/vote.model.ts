export class VoteModel {
  id:number;
  parentId: number;
  title: string;
  createDateTime: Date;
  status: boolean;
  priority: number;
  hasChild?: boolean;
}
