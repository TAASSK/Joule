/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { SignupService } from '../shared/services/index';
import { User, SignupService } from '../shared';

/*
 * Angular library
 * */

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

	user: User;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private signup: SignupService
	) { }

	ngOnInit() {
		this.user = new User();

	}

	save(){
		//this.user.id = 15789;
		this.signup.add(this.user).subscribe(x => {
         this.router.navigateByUrl('login');

			// this.router.navigateByUrl('user/{user.id}');
		});
	}

}
