import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';


@Injectable()
export abstract class RepositoryService<T> {
protected abstract endPoint;



constructor(protected httpClient: HttpClient) {}

protected httpOptions =
{
    headers: new HttpHeaders({
        'Content-Type' : 'application/json',
    })
};

public add(item: T): Observable<T> {
    return this.httpClient.post(`${this.endPoint}`, item, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public delete(id: number): Observable<T> {
    return this.httpClient.delete(`${this.endPoint}/${id}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  protected handleException(exception: any) {
    var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }




}
