/*
 * Angular library
 * */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './../../shared';

@Injectable()
export class AuthenticationService {

constructor(protected httpClient: HttpClient) {
}
	isAuthenticated(): boolean {
		return true;
	}

	logIn(email: string, password: string) {
    return this.httpClient.post<User>('/localhost:8080/api/login', {email, password});
}

	logOut() {}

}
