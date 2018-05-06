import { Injectable } from '@angular/core';
import { Review } from '../models/review';
//import { reverse } from 'dns';

@Injectable()
export class ReviewService {
  constructor() { }

// THIS IS INCOMPLETE
  submitReview(review: Review) {
    let obj ={
      job_title: review.jobTitle,
      employer: review.employer,
      hotness_rating: review.hotnessRating,
      accountability_rating: review.accountabilityRating,
	    availability_rating: review.availabilityRating,
	    politeness_rating: review.politenessRating,
	    efficiency_rating: review.efficiencyRating,
	    comment: review.comment,
	    datestamp: review.datestamp
    }


  }

}
