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
import { User } from '../../shared';

@Injectable()
export class SearchService {

	// protected endPoint: string = 'http://localhost:8080/api/search';

	protected endPoint: string = 'https://1cf79ace-771a-4d21-aa17-9f5d8e761aa5.mock.pstmn.io/search';

	constructor(
		protected httpClient: HttpClient
	) {}

	public search(query: string): Observable<User[]> {

		return this.httpClient.post(
			`${this.endPoint}`,
			{
				search_term: query
			}
		).pipe(
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
