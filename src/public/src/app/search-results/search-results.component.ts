/*
 * Angular library
 * */
import {
	Component,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute,
	Router,
	RouterLink
} from '@angular/router';

/*
 * RxJS
 * */
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';

/*
 * Models
 * */
import { User } from '../shared';

/*
 * Services
 * */
import { SearchService } from '../shared';

@Component({
	selector: 'app-search-results',
	templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {

	query: string;

	public results: Array<User> = new Array<User>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private searchService: SearchService
	) {

		this.route.queryParams.subscribe(params => {
			this.query = params['q'];
		});

		// this.searchService.search(this.query).subscribe((res: Array<User>) => {
		// 	console.log(res, typeof(res), res[0]);
		// 	this.results = res;
		// });

		// this.results$ = this.searchService.search(this.query).subscribe(res => {
		// 	var users = res['users'];
		// 	var userArray = users.map(elem => {
		// 		var user = new User();
		// 		user.deserialize(elem);
		// 		return user;
		// 	});

		// 	return userArray;
		// });

		var user1 = new User();
		var user2 = new User();
		var user3 = new User();

		user1.id = 101;
		user1.email = 'jp.joule18@gojoule.me';
		user1.firstName = 'John';
		user1.lastName = 'Doe';
		user1.jobTitle = 'Employee';
		user1.employer = 'Random Corp.';
		user1.location = 'Dallas, TX';

		user2.id = 101;
		user2.email = 'jp.joule18@gojoule.me';
		user2.firstName = 'John';
		user2.lastName = 'Doe';
		// user2.jobTitle = 'Employee';
		// user2.employer = 'Random Corp.';
		// user2.location = 'Dallas, TX';

		user3.id = 101;
		user3.email = 'jp.joule18@gojoule.me';
		user3.firstName = 'John';
		user3.lastName = 'Doe';
		user3.jobTitle = 'Employee';
		user3.employer = 'Random Corp.';
		// user3.location = 'Dallas, TX';

		this.results.push(user1, user2, user3);

	}

	ngOnInit() { }

}
