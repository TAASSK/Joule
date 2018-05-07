/*
 * Angular library
 * */
import {
	Component,
	Input,
	NgModule,
	AfterViewInit
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
export class ReviewComponent implements AfterViewInit {

	@Input() review: Review;

	constructor() { }

	ngAfterViewInit() { }

}
