/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
 * 3rd party libraries
 * */
import * as moment from 'moment';

/*
 * Models
 * */
import { User } from '../../shared';

/*
 * RxJS
 * */
import 'rxjs/add/operator/do';
import { catchError } from 'rxjs/operators';

/*
 * Services
 * */
import { RepositoryService } from './repository.service';

@Injectable()
export class AuthenticationService extends RepositoryService<User> {

	protected endPoint = 'http://localhost:8080/api/login';

	constructor(
		protected httpClient: HttpClient
	) {
		super(httpClient);
	}

	isAuthenticated(): boolean {
		return true;
	}

	logIn(email: string, password: string) {

		// return this.httpClient.post(
		// 	`${this.endPoint}`,
		// 	{email, password},
		// 	this.httpOptions)
		// .do(res => this.setSession)
		// .pipe(catchError(this.handleException));

		return this.httpClient.post(
			`${this.endPoint}`,
			{email, password},
      {responseType: 'text'})
		.pipe(catchError(this.handleException));

	}      // this.httpOptions)




	private setSession(authResult) {
		const expiresAt = moment().add(authResult.expiresIn, 'second');

		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

	}

	logOut() {

		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');

	}
}
