/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() { }

	gotoAccount(id: number) {
		this.router.navigateByUrl('/user/'+String(id)+'/account');
	}

}
