/*
 * Angular library
 * */
import {
	Component,
	Input,
	NgModule,
	OnInit
} from '@angular/core';

/*
 * Models
 * */
import {
	Review,
	User
} from '../../shared';

@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
})
export class ReviewComponent implements OnInit {

	user: User;
	review: Review;

	constructor() {

		this.user = new User();
		this.review = new Review();

		this.user.email = "";
		this.user.email = "";
		this.user.firstName = "";
		this.user.lastName = "";
		this.user.password = "";
		this.user.jobTitle = "";
		this.user.employer = "";
		this.user.location = "";

		this.review.jobTitle = "";
		this.review.employer = "";
		this.review.qualityRating = 78;
		this.review.recommendRating = 84;
		this.review.comment = "";
		this.review.datestamp = new Date();

		var userObj = {
			email: this.email,
			first_name: this.firstName,
			last_name: this.lastName,
			password: this.password,
			job_title: this.jobTitle,
			employer: this.employer,
			location: this.location
		};

		var reviewObj = {
			job_title: this.jobTitle,
			employer: this.employer,
			quality_rating: this.qualityRating,
			recommend_rating: this.recommendRating,
			comment: this.comment,
			datestamp: this.datestamp
		};

	}

	ngOnInit() { }

	logUserSerialize() {
		console.log(this.user.serialize());
	}

	logReviewSerialize() {
		console.log(this.review.serialize());
	}

}
