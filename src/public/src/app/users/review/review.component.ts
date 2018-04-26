import { UsersModule } from './../users.module';
import { Component, OnInit, NgModule, Input } from '@angular/core';
//import { Review } from '../../domain/models/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
})
export class ReviewComponent implements OnInit {

  @Input()
  //public reviews: Review[] = [];
  //public userReview: Review;
  public date = new Date();


  constructor() { }

  ngOnInit() {
    //this.reviews = [];
    //this.userReview = {};
  }
  public addReview() {
    // ensure that input fields have data
    /*
    if (this.userReview.comment == null || this.userReview.overallRating == null || this.userReview.revieweeName == null) {
        return;
    }
    this.reviews.push(this.userReview);
    this.userReview = {};
    */
  }

}
