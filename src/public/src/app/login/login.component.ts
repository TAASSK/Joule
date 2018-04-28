/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/*
 * Directives
 * */
import { AuthenticationService } from './../shared/services/authentication.service';
import { FocusOnLoadDirective } from '../shared';

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
    this.router.navigateByUrl('user/1'); });


  }

}


