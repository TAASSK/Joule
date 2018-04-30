/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

/*
 * Models
 * */
import { User } from '../../shared';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

	user: User;

	constructor(
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

	}

	ngOnInit() { }

}
