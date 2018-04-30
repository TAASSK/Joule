/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/*
 * Models
 * */
import {
	Review,
	User
} from '../../shared';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

	user: User;
	reviews: Array<Review> = new Array<Review>();

	avgAccountabilityRating: number;
	avgAvailabilityRating: number;
	avgPolitenessRating: number;
	avgEfficiencyRating: number;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {

		this.user = new User();

		this.user.id = 101;
		this.user.email = 'jp.joule18@gojoule.me';
		this.user.firstName = 'John';
		this.user.lastName = 'Doe';
		this.user.jobTitle = 'Employee';
		this.user.employer = 'Random Corp.';
		this.user.location = 'Dallas, TX';

		this.reviews.push(
			new Review(
				101,
				'Employee',
				'Random Corp.',
				85,
				83,
				34,
				13,
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi ante, finibus ut vehicula ac, cursus non nisl. Praesent malesuada, urna at volutpat semper, metus dolor faucibus turpis, vitae suscipit elit tellus sed est. Proin porta aliquet nisi sit amet ultrices. Ut efficitur tortor lectus, quis facilisis quam consequat sit.`,
				new Date()
			),
			new Review(
				102,
				'Employee',
				'Random Corp.',
				92,
				98,
				94,
				91,
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend eros accumsan aliquet rutrum. Sed in urna eros. Nullam tincidunt dolor est, eu semper massa interdum vel. Maecenas vitae laoreet nisl. Sed ac ullamcorper metus. Pellentesque scelerisque leo porttitor elit elementum hendrerit. Mauris scelerisque sapien in laoreet aliquet. Class aptent.`,
				new Date('2020-09-30T17:59:00.000Z')
			),
			new Review(
				105,
				'Employee',
				'Random Corp.',
				98,
				43,
				51,
				45,
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris turpis, facilisis viverra enim vitae, ultrices placerat massa. Ut ac neque et ante fringilla eleifend. Nunc in molestie dui. Phasellus interdum massa nisi, vitae mollis elit accumsan sed. Duis fermentum sed velit eu faucibus. Maecenas sollicitudin ligula sapien, at dictum.`,
				new Date()
			)
		);

		// calculate the average for all rating types in all reviews
		this.avgAccountabilityRating = Math.round(this.reviews.reduce(
		(prevVal, elem) => {
			return prevVal + elem.accountabilityRating
		}, 0) / this.reviews.length) / 100;

		this.avgAvailabilityRating = Math.round(this.reviews.reduce(
		(prevVal, elem) => {
			return prevVal + elem.availabilityRating
		}, 0) / this.reviews.length) / 100;

		this.avgPolitenessRating = Math.round(this.reviews.reduce(
		(prevVal, elem) => {
			return prevVal + elem.politenessRating
		}, 0) / this.reviews.length) / 100;

		this.avgEfficiencyRating = Math.round(this.reviews.reduce(
		(prevVal, elem) => {
			return prevVal + elem.efficiencyRating
		}, 0) / this.reviews.length) / 100;

	}

	ngOnInit() { }

	listReviews() {
		console.log(this.reviews);
	}

}

