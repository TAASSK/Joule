import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RepositoryService } from './repository.service';
import { User } from '..';
import { catchError } from 'rxjs/operators';
import { Observable } from "rxjs";



@Injectable()
export class userService extends RepositoryService<User> {
    protected endPoint = 'http://localhost:8080/api/users'
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
     }
     public getById(id: number): Observable<User> {
        return this.httpClient.get(`${this.endPoint}/${id}`, this.httpOptions).pipe(
          catchError(this.handleException)
        );
    }

}
