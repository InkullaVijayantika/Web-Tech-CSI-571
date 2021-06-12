import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { HomePageService } from './shared/homepage.service';
import {AutocompleteModel} from '../navbar/shared/autocomplete.model';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomePageComponent implements OnInit {
  images: AutocompleteModel[];
  data: AutocompleteModel[];
  details: AutocompleteModel;

  popmovdata: AutocompleteModel[];
  popmovData = [];

  topmovdata: AutocompleteModel[];
  topmovData = [];

  trendmovdata: AutocompleteModel[];
  trendmovData = [];

  poptvdata: AutocompleteModel[];
  poptvData = [];

  toptvdata: AutocompleteModel[];
  toptvData = [];

  trendtvdata: AutocompleteModel[];
  trendtvData = [];

  isEmpty: boolean;

  actualData: any[] = [];
  mobile: boolean;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(public breakpointObserver: BreakpointObserver, private service: HomePageService, private router: Router) { }

  ngOnInit(): void {
    this.data = [];
    this.service.getCurrentMovies().subscribe(data => {this.images = data; }, err => console.log(err));
    this.get();
    this.getPopMovie();
    this.getTopMovie();
    this.getTrendMovie();
    this.getPopTV();
    this.getTopTV();
    this.getTrendTV();
    // localStorage.clear();

    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe(state => {
        if (state.matches) {
          console.log('Viewport is 600px or over!');
          this.mobile = false;
        } else {
          console.log('Viewport is smaller than 600px!');
          this.mobile = true;
        }
      });

  }

  togglePaused(): void {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent): void {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  // tslint:disable-next-line:variable-name
  openDetails(media_type, id): void{
    this.router.navigate(['/watch', media_type, id]).catch(err => console.log(err));
  }

  updateContinueWatch(d): void{
    let isPresent = false;
    this.details = d;
    if (this.service.get().hasOwnProperty(this.details.title)){
      this.service.remove(this.details);
      isPresent = false;
    }
    isPresent = !isPresent;
    if (isPresent){
      this.service.add(this.details);
    }
  }


  get(): void{
    let j = -1;
    this.data = this.service.getData();
    if (this.data){
      for (let i = 0; i < this.data.length; i++){
        if (i % 6 === 0){
          j++;
          this.actualData[j] = [];
          this.actualData[j].push(this.data[i]);
        }
        else{
          this.actualData[j].push(this.data[i]);
        }
      }
    }
    if (this.data){
      this.isEmpty = false;
    }
    else{
      this.isEmpty = true;
    }
  }

  getPopMovie(): void{
    let j = -1;
    this.service.getPopularMovies().subscribe(data =>
    {this.popmovdata = data; console.log(this.popmovdata);
     for (let i = 0; i < this.popmovdata.length; i++){
        if (i % 6 === 0){
          j++;
          this.popmovData[j] = [];
          this.popmovData[j].push(this.popmovdata[i]);
        }
        else{
          this.popmovData[j].push(this.popmovdata[i]);
        }
      }
    }, err => console.log(err));
  }

  getTopMovie(): void{
    let j = -1;
    this.service.getTopMovies().subscribe(data =>
    {this.topmovdata = data; console.log(this.topmovdata);
     for (let i = 0; i < this.topmovdata.length; i++){
        if (i % 6 === 0){
          j++;
          this.topmovData[j] = [];
          this.topmovData[j].push(this.topmovdata[i]);
        }
        else{
          this.topmovData[j].push(this.topmovdata[i]);
        }
      }
    }, err => console.log(err));
  }

  getTrendMovie(): void{
    let j = -1;
    this.service.getTrendingMovies().subscribe(data =>
    {this.trendmovdata = data; console.log(this.trendmovdata);
     for (let i = 0; i < this.trendmovdata.length; i++){
        if (i % 6 === 0){
          j++;
          this.trendmovData[j] = [];
          this.trendmovData[j].push(this.trendmovdata[i]);
        }
        else{
          this.trendmovData[j].push(this.trendmovdata[i]);
        }
      }
    }, err => console.log(err));
  }

  getPopTV(): void{
    let j = -1;
    this.service.getPopularTV().subscribe(data =>
    {this.poptvdata = data; console.log(this.poptvdata);
     for (let i = 0; i < this.poptvdata.length; i++){
        if (i % 6 === 0){
          j++;
          this.poptvData[j] = [];
          this.poptvData[j].push(this.poptvdata[i]);
        }
        else{
          this.poptvData[j].push(this.poptvdata[i]);
        }
      }
    }, err => console.log(err));

  }

  getTopTV(): void{
    let j = -1;
    this.service.getTopTV().subscribe(data =>
    {this.toptvdata = data; console.log(this.toptvdata);
     for (let i = 0; i < this.toptvdata.length; i++){
        if (i % 6 === 0){
          j++;
          this.toptvData[j] = [];
          this.toptvData[j].push(this.toptvdata[i]);
        }
        else{
          this.toptvData[j].push(this.toptvdata[i]);
        }
      }
    }, err => console.log(err));

  }

  getTrendTV(): void{
    let j = -1;
    this.service.getTrendingTV().subscribe(data =>
    {this.trendtvdata = data; console.log(this.trendtvdata);
     for (let i = 0; i < this.trendtvdata.length; i++){
        if (i % 6 === 0){
          j++;
          this.trendtvData[j] = [];
          this.trendtvData[j].push(this.trendtvdata[i]);
        }
        else{
          this.trendtvData[j].push(this.trendtvdata[i]);
        }
      }
    }, err => console.log(err));
  }

}
