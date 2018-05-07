/*
 * Angular library
 * */
import {
	AfterViewInit,
	Component,
	Input
} from '@angular/core';
import {
	NgStyle,
	PercentPipe
} from '@angular/common';

/*
 * Services
 * */
import { RatingGradientService } from '../rating-gradient.service';

@Component({
	selector: 'app-rating-bar',
	templateUrl: './rating-bar.component.html'
})
export class RatingBarComponent implements AfterViewInit {

	@Input() descriptor: string;
	@Input() rating: number;

	displayedRating: number = 0;

	constructor(
		public rg: RatingGradientService
	) {

		window.setTimeout(() => {
			const animateRating = () => {

				if(this.displayedRating != this.rating) {
					this.displayedRating += (this.rating - this.displayedRating) * 0.075;
					window.requestAnimationFrame(animateRating);
				}

			};
			window.requestAnimationFrame(animateRating);
		}, 200);

	}

	ngAfterViewInit() { }

}
