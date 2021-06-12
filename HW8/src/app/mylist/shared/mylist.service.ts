import {HttpClient} from '@angular/common/http';
import {DetailsModel} from '../../details/shared/details.model';
import {Injectable} from '@angular/core';
import {MylistModel} from './mylist.model';
import {LocalStorageMylistModel} from './mylist.model';

@Injectable({
  providedIn: 'root'
})
export class MylistService{
  constructor(private http: HttpClient) { }
  private object: { // @ts-ignore
    // tslint:disable-next-line:ban-types
    [Key: string]: string } = {};

  get(): LocalStorageMylistModel<MylistModel>{
    if (localStorage.hasOwnProperty('mylist')){
      return JSON.parse(localStorage.mylist);
    }
    localStorage.mylist = JSON.stringify({});
    return JSON.parse(localStorage.mylist);
  }

  // tslint:disable-next-line:variable-name
  add(data: DetailsModel, media_type): void{
    const{ title, id, poster_path} = data;
    this.object[title] = JSON.stringify({
      title, id, poster_path, media_type
    });
    localStorage.mylist = JSON.stringify(this.object);
  }

  remove(data: DetailsModel): void{
    this.object = JSON.parse(localStorage.mylist);
    delete this.object[data.title];
    localStorage.mylist = JSON.stringify(this.object);
  }

  getData(): MylistModel[]{
    if (!localStorage.hasOwnProperty('mylist')) {
      return undefined;
    }
    const modelData: MylistModel[] = [];
    this.object = JSON.parse(localStorage.mylist);
    for (const key in this.object) {
      if (this.object.hasOwnProperty(key)) {
        modelData.push(JSON.parse(this.object[key]));
      }
    }
    return modelData.reverse();
  }
}
