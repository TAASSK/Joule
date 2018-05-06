import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RepositoryService } from './repository.service';
import { User } from '..';
import { catchError } from 'rxjs/operators';
import { Observable } from "rxjs";



@Injectable()
export class userService extends RepositoryService<User> {
    protected endPoint = 'http://localhost:8080/api/users'
    protected endPoint2 = 'http://localhost:8080/api/user'
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
     }
     public getById(id: number): Observable<User> {
        return this.httpClient.get(`${this.endPoint}/${id}`, this.httpOptions).pipe(
          catchError(this.handleException)
        );
    }
    public updateUserInformation(item: User, id: number): Observable<User>
    {
        console.log(item);
        var obj = {
    		first_name: item.firstName,
    		last_name: item.lastName,
            password: item.password,
            job_title: item.jobTitle,
            employer: item.employer,
            location: item.location
    	}
        const user = item.serialize(obj);
        console.log(user);
        return this.httpClient.put(`${this.endPoint}/${id}`, user, this.httpOptions).pipe(
            catchError(this.handleException)
         );
    }
    public updatePassword(item: User, id: number): Observable<User>{
        var obj = {
            first_name: item.firstName,
    		last_name: item.lastName,
            password: item.password,
            job_title: item.jobTitle,
            employer: item.employer,
            location: item.location
        }
        console.log(obj.password);
        const user = item.serialize(obj);
        console.log(user);
        return this.httpClient.put(`${this.endPoint}/${id}`, user, this.httpOptions).pipe(
            catchError(this.handleException)
          );
    }
    public delete(id: number): Observable<User>
    {
        return this.httpClient.delete(`${this.endPoint2}/${id}`, this.httpOptions).pipe(
            catchError(this.handleException)
          );
    }

}
