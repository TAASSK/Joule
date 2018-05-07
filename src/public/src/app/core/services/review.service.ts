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
import { Review } from '../../shared';

@Injectable()
export class ReviewService {

	protected endPoint = 'http://localhost:8080/api/users';

	protected httpOptions = {
		headers: new HttpHeaders({
			'Content-Type' : 'application/json',
		})
	};

	constructor(
		private httpClient: HttpClient
	) { }

	add(userId: number, review: Review): Observable<Review> {

		return this.httpClient.post(
			`${this.endPoint}/${userId}/reviews`,
			{
				job_title: review.jobTitle,
				employer: review.employer,
				hotness_rating: review.hotnessRating,
				accountability_rating: review.accountabilityRating,
				politeness_rating: review.politenessRating,
				efficiency_rating: review.efficiencyRating,
				comment: review.comment,
				datestamp: new Date()
			},
			this.httpOptions
		).pipe(
			catchError(this.handleException)
		);

	}

	get(userId: number): Observable<Review[]> {

		return this.httpClient.get(
			`${this.endPoint}/${userId}/reviews`,
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
