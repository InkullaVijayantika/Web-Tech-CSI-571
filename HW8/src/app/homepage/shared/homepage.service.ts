import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageContinueWatchlistModel} from './current.model';
import {AutocompleteModel} from '../../navbar/shared/autocomplete.model';


@Injectable({
  providedIn: 'root'
})

export class HomePageService {

  constructor(private http: HttpClient) { }

  private object: { // @ts-ignore
    // tslint:disable-next-line:ban-types
    [Key: string]: string } = {};

  modelData: AutocompleteModel[] = [];
  flag = false;
  actualData = [];

  getCurrentMovies(): Observable<AutocompleteModel[]> {
    // tslint:disable-next-line:prefer-const
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/currentmovies`);
  }

  get(): LocalStorageContinueWatchlistModel<AutocompleteModel> {
    if (localStorage.hasOwnProperty('continueWatchlist')){
      return JSON.parse(localStorage.continueWatchlist);
    }
    localStorage.continueWatchlist = JSON.stringify({});
    return JSON.parse(localStorage.continueWatchlist);
  }

  add(details: AutocompleteModel): void{
    const{id, title, backdrop_path, media_type, poster_path} = details;
    this.object[title] = JSON.stringify({
      id,
      title,
      backdrop_path,
      media_type,
      poster_path
    });
    localStorage.continueWatchlist = JSON.stringify(this.object);

  }

  remove(data: AutocompleteModel): void{
    this.object = JSON.parse(localStorage.continueWatchlist);
    delete this.object[data.title];
    localStorage.continueWatchlist = JSON.stringify(this.object);
  }

  getData(): AutocompleteModel[]{
    if (!localStorage.hasOwnProperty('continueWatchlist')) {
      return undefined;
    }
    const modelData: AutocompleteModel[] = [];
    this.object = JSON.parse(localStorage.continueWatchlist);
    for (const key in this.object) {
      if (this.object.hasOwnProperty(key)) {
        modelData.push(JSON.parse(this.object[key]));
      }
    }
    return modelData.reverse();
  }

  getPopularMovies(): Observable<AutocompleteModel[]>{
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/popularmovies`);
  }

  getTopMovies(): Observable<AutocompleteModel[]>{
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/topmovies`);
  }

  getTrendingMovies(): Observable<AutocompleteModel[]>{
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/trendmovies`);
  }

  getPopularTV(): Observable<AutocompleteModel[]>{
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/populartv`);
  }

  getTopTV(): Observable<AutocompleteModel[]>{
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/toptv`);
  }

  getTrendingTV(): Observable<AutocompleteModel[]>{
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/trendtv`);
  }

}
