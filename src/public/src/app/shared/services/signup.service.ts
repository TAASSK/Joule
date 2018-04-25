import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { RepositoryService } from './repository.service';

@Injectable()
export class SignupService extends RepositoryService {
protected endPoint = '';
constructor(protected httpClient: HttpClient) { 
    super(httpClient)
}


}
