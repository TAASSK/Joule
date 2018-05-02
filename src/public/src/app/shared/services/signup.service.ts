import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { RepositoryService } from './repository.service';
//import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { User } from '..';
import { Observable } from "rxjs";

//import { Observable } from 'rxjs/Observable';
import { CATCH_ERROR_VAR, SUPER_EXPR } from '@angular/compiler/src/output/output_ast';
 
@Injectable()
export class SignupService extends RepositoryService<User> {
protected endPoint = 'http://localhost:8080/api/users';
constructor(protected httpClient: HttpClient) { 
    super(httpClient);
}

public add(item: User): Observable<User> {
  var obj = {
    		email: item.email,
    		first_name: item.firstName,
    		last_name: item.lastName,
    		password: item.password
    	}
    const user = item.serialize(obj);
    console.log(user);
    return this.httpClient.post(`${this.endPoint}`, user, this.httpOptions).pipe(
    catchError(this.handleException)
    );
  }


}
