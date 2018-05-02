/*
 * Angular library
 * */
import {
	Component,
	Input,
	NgModule,
	AfterViewInit
} from '@angular/core';
import {
	NgStyle,
	DatePipe,
	PercentPipe
} from '@angular/common';

/*
 * Models
 * */
import { Review } from '../../shared';

/*
 * Services
 * */
import { RatingGradientService } from '../../shared';

@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
})
export class ReviewComponent implements AfterViewInit {

	@Input()
	review: Review;

	// shown ratings
	public hotnessDisplayedRating: number = 0;
	public accountabilityDisplayedRating: number = 0;
	public politenessDisplayedRating: number = 0;
	public efficiencyDisplayedRating: number = 0;

	constructor(
		private rg: RatingGradientService
	) { }

	ngAfterViewInit() { }

}
