/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';

/*
 * RxJS
 * */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';

/*
 * 3rd party libraries
 * */
import * as moment from 'moment';

/*
 * Models
 * */
import { User } from '../../shared';

/*
 * Services
 * */
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {

	protected endPoint = 'http://localhost:8080/api/login';

	protected httpOptions = {
		headers: new HttpHeaders({
			'Content-Type' : 'application/json',
		})
	};

	public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(null);

	constructor(
		protected httpClient: HttpClient,
		private router: Router,
		private userService: UserService
	) {
		let authStatus = this.isLoggedIn();
		this.isAuthenticated.next(authStatus);
	}

	public isLoggedIn(): boolean {
		return moment().isBefore(this.getExpiration());
	}

	isLoggedOut(): boolean {
		return !this.isLoggedIn();
	}

	login(email: string, password: string) {

		// hit the login endpoint;
		// shareReplay to prevent multiple POST requests
		return this.httpClient.post(
			`${this.endPoint}`,
			{
				email: email,
				password: password
			}, 
			this.httpOptions
		).do(res => {
			this.setSession(res);
		}).shareReplay();
	}

	logout() {

		// remove token from storage
		localStorage.removeItem('token');
		localStorage.removeItem('expires_at');

		// remove current global user
		this.userService.setCurrentUser(null);

		// set authentication flag to false
		this.isAuthenticated.next(false);

		// navigate to home page
		this.router.navigate(['home']);

	}

	private setSession(authResult: object) {

		const expiresAt = moment().add(authResult['expires_at'], 'second');

		sessionStorage.setItem('token', authResult['token']);
		sessionStorage.setItem('expires_at', expiresAt.toString());

		// create a global user object once authenticated
		this.userService.getById(
			authResult['user_id']
		).subscribe(user => {
			let currentUser = new User();

			this.userService.setCurrentUser(
				currentUser.deserialize(user)
			);

		});

	}

	getExpiration() {
		const expiresAt = sessionStorage.getItem('expires_at');

		return moment(expiresAt);
	}

	protected handleException(exception: any) {
		let message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
		alert(message);
		return Observable.throw(exception);
	}

}
