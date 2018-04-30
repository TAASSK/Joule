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

		// this.review = new Review(
		// 	101,
		// 	'Employee',
		// 	'Random Corp.',
		// 	92,
		// 	44,
		// 	34,
		// 	13,
		// 	`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi ante, finibus ut vehicula ac, cursus non nisl. Praesent malesuada, urna at volutpat semper, metus dolor faucibus turpis, vitae suscipit elit tellus sed est. Proin porta aliquet nisi sit amet ultrices. Ut efficitur tortor lectus, quis facilisis quam consequat sit.`,
		// 	new Date()
		// );

	}

	ngOnInit() { }

}
