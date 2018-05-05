/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*
 * RxJS
 * */
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

/*
 * Models
 * */
import { User } from '../../shared';

@Injectable()
export class SignupService {

	protected endPoint = 'http://localhost:8080/api/users';

	protected httpOptions = {
		headers: new HttpHeaders({
			'Content-Type' : 'application/json',
		})
	};

	constructor(
		protected httpClient: HttpClient
	) { }

	public add(item: User): Observable<User> {
		var obj = {
			email: item.email,
			first_name: item.firstName,
			last_name: item.lastName,
			password: item.password
		}
		const user = item.serialize(obj);
		console.log(user);

		return this.httpClient.post(
			`${this.endPoint}`,
			user,
			this.httpOptions
		).pipe(
			catchError(this.handleException)
		);
	}

	protected handleException(exception: any) {
		let message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
		alert(message);
		return Observable.throw(exception);
	}

}
