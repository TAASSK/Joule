/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

	id: number = 101;
	username: string = 'John Doe';
	jobTitle: string = 'Employee';
	workPlace: string = 'Random Corp.';

	overallRating: number = 0.74;
	recommend: number = 1;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() { }

	gotoAccount(id: number) {
		this.router.navigateByUrl('/user/'+String(id)+'/account');
	}

}

