/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';

/*
 * Models
 * */
import { User } from '../../shared';

@Component({
	selector: 'app-profile-settings',
	templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {

	user: User;

	constructor() {

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
