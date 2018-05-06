/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';

/*
 * Models
 * */
import { User, AuthenticationService } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { userService } from '../../shared/services/user.service';

@Component({
	selector: 'app-profile-settings',
	templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {

	user: User;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: userService,
		private auth: AuthenticationService
	) {

		/*
		this.user = new User();

		this.user.id = 101;
		this.user.email = 'jp.joule18@gojoule.me';
		this.user.firstName = 'John';
		this.user.lastName = 'Doe';
		this.user.jobTitle = 'Employee';
		this.user.employer = 'Random Corp.';
		this.user.location = 'Dallas, TX';
		*/
	}

	ngOnInit() {
		this.user = new User();
		this.user.id = +this.auth.getId();
		this.userService.getById(this.user.id).subscribe(data => {
			this.user = this.user.deserialize(data);
			console.log(data);
			console.log(this.user);
		});
		console.log(this.user);
	 }
	 update()
	 {
		 this.userService.updateUserInformation(this.user, this.user.id).subscribe
		(data => {
				console.log(data);
		});
	 }

}
