/*
 * Angular library
 * */
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

	isAuthenticated(): boolean {
		return true;
	}

	logIn() {}

	logOut() {}

}
