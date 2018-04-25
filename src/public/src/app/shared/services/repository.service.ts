import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable()
export abstract class RepositoryService {
protected abstract endPoint;

protected httpOptions = 
{
    headers: new HttpHeaders({
        'Content-Type' : 'application/json'
    })
};

constructor(httpClient: HttpClient) { }



}
