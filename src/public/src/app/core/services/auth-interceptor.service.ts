/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';

/*
 * RxJS
 * */
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		const token = sessionStorage.getItem('token');

		if(token) {
			const cloned = request.clone({
				headers: request.headers.set(
					'Authorization',
					'Bearer' + token
				)
			});

			return next.handle(cloned);

		}

		return next.handle(request);

	}

}
