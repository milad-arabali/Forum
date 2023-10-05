import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, find, Observable} from "rxjs";
import {SubjectCategoryModel} from "../../../../shared/model/subject-category.model";



@Injectable({
  providedIn: 'root'
})
export class SubjectCategoryService {
  public apiUrl: string = 'http://localhost:3000/subject-category'
  nodeSubject  = new BehaviorSubject<number | null >(1)
  parentTitleSubject = new BehaviorSubject<string | number>('')
  parentIdSubject = new BehaviorSubject<number| null>(null)
  constructor(private http: HttpClient) {
  }
  public deleteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public selectParentId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  findByParentId(parentId: number | undefined): Observable<SubjectCategoryModel[]> {
    return this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category?_sort=priority&parentId=' + `${parentId}`+'&status=true');
  }
  findByParentIdSubjectCategory(parentId: number | undefined): Observable<SubjectCategoryModel[]> {
    return this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category?_sort=priority&parentId=' + `${parentId}`);
  }
  checkId(): Observable<SubjectCategoryModel[]>{
    return this.http.get<SubjectCategoryModel[]>('http://localhost:3000/subject-category');
  }
  getSubjectList (){
    return this.http.get<any>('http://localhost:3000/subject-category')
  }
  //
  // getListByParentId(parentId: number | undefined): Observable<SubjectCategoryModel[]>{
  //   return this.http.get<SubjectCategoryModel[]>('http://localhost:3000/article-category?_sort=priority&parentId=' + `${parentId}`);
  // }

  getSubjectByID(id: number | undefined){
    return  this.http.get<SubjectCategoryModel>('http://localhost:3000/subject-category/' + `${id}`)
  }


}
