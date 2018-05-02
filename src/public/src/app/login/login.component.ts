/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/*
 * Services
 * */
import { AuthenticationService } from '../shared';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	public email: string;
	public password: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authenticate: AuthenticationService
		) { }

	ngOnInit() {
		this.email = '';
		this.password = '';
	}

	public login() {
		this.authenticate.logIn(this.email, this.password).subscribe(x => {
			console.log(x);
			console.log(x.user_id);
			let idNum = x.user_id;
			let name = 'user/'+ idNum;
			console.log(name)
			this.router.navigateByUrl(name);
		});
	}

}


