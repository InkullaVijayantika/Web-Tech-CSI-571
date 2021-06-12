import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewsModel, FullCastModel, CastModel, DetailsModel} from './details.model';
import {AutocompleteModel} from '../../navbar/shared/autocomplete.model';


@Injectable({
  providedIn: 'root'
})

export class DetailsService{
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:variable-name
  getDetails(id, media_type): Observable<DetailsModel>{
    return this.http.get<DetailsModel>(`https://vj-backend-310118.wl.r.appspot.com/watch/${media_type}/${id}`);
  }

  // tslint:disable-next-line:variable-name
  getCast(media_type, id): Observable<CastModel[]>{
    return this.http.get<CastModel[]>(`https://vj-backend-310118.wl.r.appspot.com/cast/${media_type}/${id}`);
  }

  getFullCastDetails(id): Observable<FullCastModel>{
    return this.http.get<FullCastModel>(`https://vj-backend-310118.wl.r.appspot.com/castdetails/${id}`);
  }

  // tslint:disable-next-line:variable-name
  getReviews(media_type, id): Observable<ReviewsModel[]>{
    return this.http.get<ReviewsModel[]>(`https://vj-backend-310118.wl.r.appspot.com/reviews/${media_type}/${id}`);
  }

  // tslint:disable-next-line:variable-name
  getRecom(media_type, id): Observable<AutocompleteModel[]>{
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/recommendations/${media_type}/${id}`);
  }

  // tslint:disable-next-line:variable-name
  getSim(media_type, id): Observable<AutocompleteModel[]>{
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/similar/${media_type}/${id}`);
  }

}
