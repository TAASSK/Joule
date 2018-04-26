/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './../../shared';
import  'rxjs/add/operator/do';
import * as moment from './../../../../node_modules/moment';

@Injectable()
export class AuthenticationService {

constructor(protected httpClient: HttpClient) {
}
	isAuthenticated(): boolean {
		return true;
	}

	logIn(email: string, password: string) {
    return this.httpClient.post<User>('/localhost:8080/api/login', {email, password})
    .do(res => this.setSession);
}



  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
}

logOut() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
}
}
