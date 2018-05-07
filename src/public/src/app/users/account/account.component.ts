/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

/*
 * Models
 * */
import { User } from '../../shared';

/*
 * Services
 * */
import { UserService } from '../../core/services';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

	user: User = new User();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {

		// this.user = this.userService.currentUser;

		// ***********************************
		// THIS IS DUMMY DATA -- REMOVE WITH WORKING API
		// ***********************************
		this.user.id = 4;
		// ***********************************
		// THIS IS DUMMY DATA -- REMOVE WITH WORKING API
		// ***********************************

		// this route works assuming a working API
		this.route.params.subscribe(params => {
			this.userService.getById(+params['id']).subscribe(res => {
				var tmpUser = new User();
				this.user = tmpUser.deserialize(res);
			});
		});

	}

	ngOnInit() { }

}
