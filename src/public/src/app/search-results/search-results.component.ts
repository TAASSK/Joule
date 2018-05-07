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
 * Models
 * */
import { User } from '../shared';

/*
 * Services
 * */
import { SearchService } from '../core/services';

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

		this.searchService.search(this.query).subscribe(users => {
			this.results = users.map(obj => {
				var newUser = new User();
				newUser.firstName = obj['first_name'];
				newUser.lastName = obj['last_name'];
				newUser.jobTitle = obj['job_title'];
				newUser.employer = obj['employer'];

				return newUser;
			});
		});

	}

	ngOnInit() { }

}
