/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/*
 * Services
 * */
import { AuthenticationService } from '../core/services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	email: string;
	password: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authentication: AuthenticationService
		) { }

	ngOnInit() {
		this.email = '';
		this.password = '';
	}

	public login() {

		this.authentication.login(
			this.email,
			this.password
		).subscribe(auth_info => {
			this.authentication.isAuthenticated.next(true);
			this.router.navigate(['user', auth_info['user_id']]);
		});

	}

}


