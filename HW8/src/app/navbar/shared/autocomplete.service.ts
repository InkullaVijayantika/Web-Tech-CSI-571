import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AutocompleteModel} from './autocomplete.model';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http: HttpClient) { }

  getAutocompleteData(query): Observable<AutocompleteModel[]> {
    // tslint:disable-next-line:prefer-const
    if (query === '') {
      return of([]);
    }
    const data = this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/autocomplete/${query}`);
    console.log(data);
    return this.http.get<AutocompleteModel[]>(`https://vj-backend-310118.wl.r.appspot.com/autocomplete/${query}`);
  }
}
