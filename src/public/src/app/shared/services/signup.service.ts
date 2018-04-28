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
protected endPoint = 'http://localhost:8080/api/newUser';
constructor(protected httpClient: HttpClient) { 
    super(httpClient);
}

public add(item: User): Observable<User> {
    let body = JSON.stringify(item);
    return this.httpClient.post(`${this.endPoint}`, body, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }


}
