/*
 * Angular library
 * */
import {
	Component,
	OnInit
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import {
	ActivatedRoute,
	Router
} from '@angular/router';

/*
 * Models
 * */
import {
	Review,
	User
} from '../../shared';

/*
 * Services
 * */
import {
	AuthenticationService,
	ReviewService,
	UserService
} from '../../core/services';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

	review: Review;
	reviews: Array<Review> = new Array<Review>();
	reviewForm: FormGroup;

	user: User;
	isLoggedIn: boolean;

	avgHotnessRating: number = 0;
	avgAccountabilityRating: number = 0;
	avgPolitenessRating: number = 0;
	avgEfficiencyRating: number = 0;

	constructor(
		private authentication: AuthenticationService,
		private fb: FormBuilder,
		private reviewService: ReviewService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {

		this.route.params.subscribe(params => {
			this.userService.getById(+params['id']).subscribe(res => {
				var tmpUser = new User();
				this.user = tmpUser.deserialize(res);
			});

			this.reviewService.get(+params['id']).subscribe(res => {
				this.reviews = res.map(obj => {
					var newReview = new Review();

					newReview.jobTitle = obj['job_title'];
					newReview.employer = obj['employer'];
					newReview.hotnessRating = obj['hotness_rating'];
					newReview.accountabilityRating = obj['accountability_rating'];
					newReview.politenessRating = obj['politeness_rating'];
					newReview.efficiencyRating = obj['efficiency_rating'];
					newReview.comment = obj['comment'];
					newReview.datestamp = new Date(obj['datestamp']);

					return newReview;
				});
			});
		});

		this.isLoggedIn = this.authentication.isAuthenticated.value;

		// calculate the average for all rating types in all reviews
		this.avgHotnessRating = Math.round(this.reviews.reduce(
		(prevVal, elem) => {
			return prevVal + elem.hotnessRating
		}, 0) / this.reviews.length) / 100;

		this.avgAccountabilityRating = Math.round(this.reviews.reduce(
		(prevVal, elem) => {
			return prevVal + elem.accountabilityRating
		}, 0) / this.reviews.length) / 100;

		this.avgPolitenessRating = Math.round(this.reviews.reduce(
		(prevVal, elem) => {
			return prevVal + elem.politenessRating
		}, 0) / this.reviews.length) / 100;

		this.avgEfficiencyRating = Math.round(this.reviews.reduce(
		(prevVal, elem) => {
			return prevVal + elem.efficiencyRating
		}, 0) / this.reviews.length) / 100;

		this.createReviewForm();

	}

	ngOnInit() { }

	createReviewForm() {

		this.reviewForm = this.fb.group({
			jobTitle: [
				'',
				Validators.required
			],
			employer: [
				'',
				Validators.required
			],
			hotnessRating: [
				'',
				Validators.compose([
					Validators.required,
					Validators.min(0),
					Validators.max(100)
				])
			],
			accountabilityRating: [
				'',
				Validators.compose([
					Validators.required,
					Validators.min(0),
					Validators.max(100)
				])
			],
			politenessRating: [
				'',
				Validators.compose([
					Validators.required,
					Validators.min(0),
					Validators.max(100)
				])
			],
			efficiencyRating: [
				'',
				Validators.compose([
					Validators.required,
					Validators.min(0),
					Validators.max(100)
				])
			],
			comment: [
				'',
				Validators.required
			]
		});

	}

	prepareReview(): Review {

		const formModel = this.reviewForm.value;

		var newReview: Review = new Review();

		newReview.jobTitle = formModel.jobTitle as string;
		newReview.employer = formModel.employer as string;
		newReview.hotnessRating = formModel.hotnessRating as number;
		newReview.accountabilityRating = formModel.accountabilityRating as number;
		newReview.politenessRating = formModel.politenessRating as number;
		newReview.efficiencyRating = formModel.efficiencyRating as number;
		newReview.comment = formModel.comment as string;

		return newReview;
	}

	addReview() {
		this.review = this.prepareReview();

		this.reviewService.add(this.user.id, this.review).subscribe(x => {
			console.log('Added review: ', x);
		});

		this.reviewForm.reset();

	}

}

