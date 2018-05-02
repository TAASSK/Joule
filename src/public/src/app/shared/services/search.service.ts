/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*
 * RxJS
 * */
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

/*
 * Models
 * */
import { User } from '../models';

@Injectable()
export class SearchService {

	protected endPoint: string = 'http://localhost:8080/api/search';

	constructor(
		protected httpClient: HttpClient
	) {}

	public search(query: string): Observable<Array<User>> {

		return this.httpClient.post(
			`${this.endPoint}`,
			{
				search_term: query
			}
		)
		.map((res: Response) => {
			var users = Array(res);

			var userArray = Array<User>;
			users.forEach(elem => {
				var user = new User();
				user.deserialize(elem);
				userArray.push(user);
			});

			return userArray;
		})
		.pipe(
			catchError(this.handleException)
		);

	}

	protected handleException(exception: any) {
		var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
		// alert(message);
		console.log(message);
		return Observable.throw(exception);
	}

}
