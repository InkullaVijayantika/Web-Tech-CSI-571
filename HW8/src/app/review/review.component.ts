import {Component, OnInit} from '@angular/core';
import {DetailsService} from '../details/shared/details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReviewsModel} from '../details/shared/details.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})

export class ReviewComponent implements OnInit{
  rid: string;
  id: number;
  // tslint:disable-next-line:variable-name
  media_type: string;
  reviewsData: ReviewsModel[];
  review: ReviewsModel;
  constructor(private service: DetailsService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void{
    this.rid = this.route.snapshot.params.rid;
    this.id = this.route.snapshot.params.id;
    this.media_type = this.route.snapshot.params.media_type;
    this.service.getReviews(this.media_type, this.id).subscribe(data => {this.reviewsData = data;
                                                                         this.reviewsData.forEach(d => {
      if (d.id === this.rid){
        this.review = d;
      }
    }); }, err => console.log(err));
  }

}
