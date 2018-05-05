/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders
} from '@angular/common/http';

/*
 * RxJS
 * */
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';

/*
 * Models
 * */
import { User } from '../../shared';

@Injectable()
export class UserService {

	protected endPoint = 'http://localhost:8080/api/users'

	protected httpOptions = {
		headers: new HttpHeaders({
			'Content-Type' : 'application/json',
		})
	};

	public currentUser: User;

	constructor(
		protected httpClient: HttpClient
	) { }

	public delete(id: number): Observable<User> {
		return this.httpClient.delete(`${this.endPoint}/${id}`, this.httpOptions).pipe(
			catchError(this.handleException)
			);
	}

	public getById(id: number): Observable<User> {
		return this.httpClient.get(
			`${this.endPoint}/${id}`,
			this.httpOptions
		).pipe(
			catchError(this.handleException)
		);
	}

	public updatePassword(item: User, id: number): Observable<User> {

		var obj = {
			email: item.email
		}
		const user = item.serialize(obj);

		return this.httpClient.put(`${this.endPoint}/${id}`, user, this.httpOptions).pipe(
			catchError(this.handleException)
			);

	}

	public setCurrentUser(user: User) {
		this.currentUser = user;
	}

	protected handleException(exception: any) {
		var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
		alert(message);
		return Observable.throw(exception);
	}

}
