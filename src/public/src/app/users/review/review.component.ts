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

	@Input()
	review: Review;

	constructor() {


	}

	ngOnInit() { }

}
