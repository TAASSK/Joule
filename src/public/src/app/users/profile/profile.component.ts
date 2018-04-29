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
	reviews: Array<Review>;

	overallRating: number = 0.74;
	recommend: number = 1;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {

		this.user = new User();

		this.user.id = 101;
		this.user.email = "jp.joule18@gojoule.me";
		this.user.firstName = "John";
		this.user.lastName = "Doe";
		this.user.jobTitle = "Employee";
		this.user.employer = "Random Corp.";
		this.user.location = "Dallas, TX";

	}

	ngOnInit() { }

}

