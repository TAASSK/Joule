/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';

/*
 * Models
 * */
import { User } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

/*
 * Services
 * */
import { UserService } from '../../core/services';

@Component({
	selector: 'app-profile-settings',
	templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {

	user: User;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
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
		//NOT WORKING!!
		this.user = new User();
		
		this.route.params.subscribe((params: any) => {
			this.user.id = params.id;
			let num = params.id;
			console.log(num); 
			console.log(this.route.params);
			if(num) {
			  this.userService.getById(+num).subscribe(data => {
				this.user = this.user.deserialize(data);     
				console.log(data);  
				console.log(this.user);  
			  });
			}
		  });
		  console.log(this.user);
	 }

}
