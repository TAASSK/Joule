/*
 * Angular library
 * */
import {
	Component,
	Input,
	NgModule,
	OnInit
} from '@angular/core';
import { DatePipe } from '@angular/common';

/*
 * Models
 * */
import { Review } from '../../shared';

@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
})
export class ReviewComponent implements OnInit {

	review: Review;

	constructor() {

		this.review = new Review();

		this.review.jobTitle = 'Employee';
		this.review.employer = 'Random Corp.';
		this.review.qualityRating = 78;
		this.review.recommendRating = 84;
		this.review.comment = 'They showed up to work.';
		this.review.datestamp = new Date();

	}

	ngOnInit() { }

}
