import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, finalize} from 'rxjs/operators';
import { AutocompleteModel } from './shared/autocomplete.model';
import { AutocompleteService } from './shared/autocomplete.service';
import {Router} from '@angular/router';
import {HomePageService} from '../homepage/shared/homepage.service';
import {Observable, of, OperatorFunction} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  fetchedData: AutocompleteModel[];
  details: AutocompleteModel;
  formControl = new FormControl();
  isLoading = false;

  model: any;
  searching = false;
  searchFailed = false;

  // tslint:disable-next-line:variable-name
  constructor(private homepageservice: HomePageService, private _service: AutocompleteService, private router: Router) { }

  ngOnInit(): void {
    // this.formControl.valueChanges.pipe(
    //   debounceTime(200),
    //   distinctUntilChanged(),
    //   switchMap(term => this.service.getAutocompleteData(term).pipe(finalize(() => this.isLoading = false)))
    // ).subscribe(data => this.fetchedData = data, err => console.log(err) );

  }

  // tslint:disable-next-line:variable-name
  openDetails(media_type, id): void{
    this.router.navigate(['/watch', media_type, id]).catch(err => console.log(err));
  }

  // tslint:disable-next-line:typedef
  updateContinueWatch(data, poster){
    let isPresent = false;
    this.details = data;
    if (this.homepageservice.get().hasOwnProperty(this.details.title)){
      this.homepageservice.remove(this.details);
      isPresent = false;
    }
    isPresent = !isPresent;
    if (isPresent){
      this.homepageservice.add(this.details);
    }
  }

  search: OperatorFunction<string, AutocompleteModel[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this._service.getAutocompleteData(term)
      )
    )

  formatter = (x: {title: string}) => '';

}
