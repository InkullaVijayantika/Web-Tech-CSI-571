import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { DetailsService} from './shared/details.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ReviewsModel, FullCastModel, CastModel, DetailsModel} from './shared/details.model';
import { MylistService } from '../mylist/shared/mylist.service';
import {AutocompleteModel} from '../navbar/shared/autocomplete.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import {HomePageService} from '../homepage/shared/homepage.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent implements OnInit{
  // tslint:disable-next-line:ban-types
  closeResult = '';
  id: number;
  pid: number;
  // tslint:disable-next-line:variable-name
  media_type: string;
  details: DetailsModel;
  fav = false;
  data: AutocompleteModel;
  castData: CastModel[];
  fullCast: FullCastModel;
  reviewsData: ReviewsModel[];
  recom: AutocompleteModel[];
  actualRecom = [];
  similar: AutocompleteModel[];
  actualSim = [];
  message = '';
  buttext = 'Add to watchlist';

  mobile: boolean;


  // tslint:disable-next-line:max-line-length
  constructor( private homepageservice: HomePageService, public breakpointObserver: BreakpointObserver, private modalService: NgbModal, private mylistService: MylistService, private service: DetailsService, private route: ActivatedRoute, private router: Router){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.media_type = this.route.snapshot.params.media_type;
    console.log(this.id, this.media_type);
    this.service.getDetails(this.id, this.media_type).subscribe(data => {this.details = data;
                                                                         console.log(this.details.poster_path);
                                                                         if (this.mylistService.get().hasOwnProperty(this.details.title)){
        this.fav = true;
        this.buttext = 'Remove from watchlist';
      }
                                                                         if (!this.fav){
        this.buttext = 'Add to watchlist';
      }
    }, err => console.log(err));
    this.service.getCast(this.media_type, this.id).subscribe(data => {this.castData = data; }, err => console.log(err));
    this.service.getReviews(this.media_type, this.id).subscribe(data => {this.reviewsData = data; }, err => console.log(err));
    this.getRecommendations();
    this.getSimilar();

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


  // tslint:disable-next-line:typedef
  floor(value){
    return Math.floor(value);
  }

  // tslint:disable-next-line:typedef
  genres(arr){
    let genres = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++){
      genres += arr[i].name + '.';
    }
    return genres;
  }

  // tslint:disable-next-line:typedef
  languages(arr){
    let languages = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++){
      languages += arr[i].name + '.';
    }
    return languages;
  }

  updateWatchlist(): void{
    this.fav = !this.fav;
    if (this.fav){
      this.mylistService.add(this.details, this.media_type);
      this.message =  ' Added to Watchlist.';
      this.buttext = 'Remove from watchlist';
      setTimeout(() => this.message = '', 5000);
    }
    if (!this.fav) {
      this.mylistService.remove(this.details);
      this.message =  ' Removed from Watchlist.';
      this.buttext = 'Add to watchlist';
      setTimeout(() => this.message = '', 5000);
    }
  }


  open(content, id): void{
    this.pid = id;
    this.service.getFullCastDetails(this.pid).subscribe(data => {this.fullCast = data; }, err => console.log(err));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // tslint:disable-next-line:typedef
  knownas(arr){
    let knownas = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++){
      knownas += arr[i] + '. ';
    }
    return knownas;
  }

  navigateToReview(rid): void{
    this.router.navigate(['/review', this.media_type, this.id, rid]).catch(err => console.log(err));
  }

  getRecommendations(): void{
    let j = -1;
    this.service.getRecom(this.media_type, this.id).subscribe(data => {this.recom = data;
                                                                       for (let i = 0; i < this.recom.length; i++){
        if (i % 6 === 0){
          j++;
          this.actualRecom[j] = [];
          this.actualRecom[j].push(this.recom[i]);
        }
        else{
          this.actualRecom[j].push(this.recom[i]);
        }
      }}, err => console.log(err));
  }

  getSimilar(): void{
    let j = -1;
    this.service.getSim(this.media_type, this.id).subscribe(data => {this.similar = data;
                                                                     for (let i = 0; i < this.similar.length; i++){
        if (i % 6 === 0){
          j++;
          this.actualSim[j] = [];
          this.actualSim[j].push(this.similar[i]);
        }
        else{
          this.actualSim[j].push(this.similar[i]);
        }
      }}, err => console.log(err));
  }

  openDetails(id): void{
    this.router.navigate(['/watch', this.media_type, id]).catch(err => console.log(err));

  }

  updateContinueWatch(d): void{
    let isPresent = false;
    // this.details = d;
    if (this.homepageservice.get().hasOwnProperty(d.title)){
      this.homepageservice.remove(d);
      isPresent = false;
    }
    isPresent = !isPresent;
    if (isPresent){
      this.homepageservice.add(d);
    }
  }
}
