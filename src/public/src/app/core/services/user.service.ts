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

	protected endPoint = 'http://localhost:8080/api/users';

	protected httpOptions = {
		headers: new HttpHeaders({
			'Content-Type' : 'application/json',
		})
	};

	public currentUser: User;

	constructor(
		protected httpClient: HttpClient
	) { }

	public add(item: User): Observable<User> {
		return this.httpClient.post(
			`${this.endPoint}`,
			{
				email: item.email,
				first_name: item.firstName,
				last_name: item.lastName,
				password: item.password
			},
			this.httpOptions
		).pipe(
			catchError(this.handleException)
		);
	}

	public delete(id: number): Observable<User> {
		return this.httpClient.delete(
			`${this.endPoint}/${id}`,
			this.httpOptions
		).pipe(
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

	public setCurrentUser(user: User) {
		this.currentUser = user;
	}

	public update(updatedUser: User): Observable<User> {

		var obj = {
			email: updatedUser.email || null,
			first_name: updatedUser.firstName || null,
			last_name: updatedUser.lastName || null,
			password: updatedUser.password || null,
			job_title: updatedUser.jobTitle || null,
			employer: updatedUser.employer || null,
			location: updatedUser.location || null
		};

		return this.httpClient.put(
			`${this.endPoint}/${updatedUser.id}`,
			obj, 
			this.httpOptions
		).pipe(
			catchError(this.handleException)
		);

	}

	protected handleException(exception: any) {
		var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
		alert(message);
		return Observable.throw(exception);
	}

}
