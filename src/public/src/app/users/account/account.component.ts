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

		this.user = new User(
			101,
			'jp.joule18@gojoule.me',
			'John',
			'Doe',
			'Employee',
			'Random Corp.',
			'Dallas, TX'
		);

	}

	ngOnInit() { }

}
