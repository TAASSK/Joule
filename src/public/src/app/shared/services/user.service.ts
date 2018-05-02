import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RepositoryService } from './repository.service';
import { User } from '..';


@Injectable()
export class userService extends RepositoryService<User> {
    protected endPoint = 'http://localhost:8080/api/users'
    constructor(protected httpClient: HttpClient) {
        super(httpClient);
     }

}
