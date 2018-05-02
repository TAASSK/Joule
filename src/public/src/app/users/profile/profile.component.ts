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

	avgHotnessRating: number;
	avgAccountabilityRating: number;
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

		// dummy reviews
		var review1 = new Review();
		var review2 = new Review();
		var review3 = new Review();

		review1.id = 101;
		review1.jobTitle = 'Employee';
		review1.employer = 'Random Corp.';
		review1.hotnessRating = 59;
		review1.accountabilityRating = 83;
		review1.politenessRating = 34;
		review1.efficiencyRating = 13;
		review1.comment = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi ante, finibus ut vehicula ac, cursus non nisl. Praesent malesuada, urna at volutpat semper, metus dolor faucibus turpis, vitae suscipit elit tellus sed est. Proin porta aliquet nisi sit amet ultrices. Ut efficitur tortor lectus, quis facilisis quam consequat sit.`;
		review1.datestamp = new Date();

		review2.id = 102;
		review2.jobTitle = 'Employee';
		review2.employer = 'Random Corp.';
		review2.hotnessRating = 33;
		review2.accountabilityRating = 98;
		review2.politenessRating = 94;
		review2.efficiencyRating = 91;
		review2.comment = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend eros accumsan aliquet rutrum. Sed in urna eros. Nullam tincidunt dolor est, eu semper massa interdum vel. Maecenas vitae laoreet nisl. Sed ac ullamcorper metus. Pellentesque scelerisque leo porttitor elit elementum hendrerit. Mauris scelerisque sapien in laoreet aliquet. Class aptent.`;
		review2.datestamp = new Date('2020-09-30T17:59:00.000Z');

		review3.id = 103;
		review3.jobTitle = 'Employee';
		review3.employer = 'Random Corp.';
		review3.hotnessRating = 68;
		review3.accountabilityRating = 43;
		review3.politenessRating = 51;
		review3.efficiencyRating = 45;
		review3.comment = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris turpis, facilisis viverra enim vitae, ultrices placerat massa. Ut ac neque et ante fringilla eleifend. Nunc in molestie dui. Phasellus interdum massa nisi, vitae mollis elit accumsan sed. Duis fermentum sed velit eu faucibus. Maecenas sollicitudin ligula sapien, at dictum.`;
		review3.datestamp = new Date();

		this.reviews.push(review1, review2, review3);

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

	}

	ngOnInit() { }

	listReviews() {
		console.log(this.reviews);
	}

}

