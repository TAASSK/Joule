/*
 * Angular library
 * */
import {
	NgStyle,
	PercentPipe
} from '@angular/common';
import {
	Component,
	Input,
	AfterViewInit
} from '@angular/core';

/*
 * Services
 * */
import { RatingGradientService } from '../../shared';

@Component({
	selector: 'app-rating-box',
	templateUrl: './rating-box.component.html'
})
export class RatingBoxComponent implements AfterViewInit {

	// must be a number between 0 and 1
	@Input() public rating: number;

	// shown rating
	public displayedRating: number = 0;

	// short string describing the type of rating
	@Input() public descriptor: string;

	constructor(
		private rg: RatingGradientService
	) { }

	ngAfterViewInit() {

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

}
