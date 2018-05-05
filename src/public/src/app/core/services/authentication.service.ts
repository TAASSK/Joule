/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders
} from '@angular/common/http';

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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';

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
	) { }

	// isAuthenticated(): boolean {
	// 	return true;
	// }

	login(email: string, password: string) {

		return this.httpClient.post(
			`${this.endPoint}`,
			{
				email: email,
				password: password
			}, 
			this.httpOptions
		).do(res => {
			this.setSession(res);
		}).pipe(
			catchError(this.handleException)
		);
	}

	private setSession(authResult: object) {
			// const expiresAt = moment().add(authResult.expires_at, 'second');
			console.log(localStorage + 'hmm');

			localStorage.setItem('token', authResult['token']);
	    // localStorage.setItem('expires_at', authResult['expires_at']);

			// localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

		}

		public getToken() {
		const token = localStorage.getItem('token');
		console.log(token);
		return token;
	}

	public logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('expires_at');
		console.log(localStorage);
		console.log('testStoreage');
	}

	protected handleException(exception: any) {
		let message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
		alert(message);
		return Observable.throw(exception);
	}

}
