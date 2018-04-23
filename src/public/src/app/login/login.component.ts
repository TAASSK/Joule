/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/*
 * Directives
 * */
import { FocusOnLoadDirective } from '../shared';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() { }

}
