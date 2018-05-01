/*
 * Angular library
 * */
import {
	Component,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute,
	Router
} from '@angular/router';

/*
 * Models
 * */
import { User } from '../shared';

@Component({
	selector: 'app-search-results',
	templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {

	query: string;

	results: Array<User> = new Array<User>();

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {

		this.route.queryParams.subscribe(params => {
			this.query = params['q'];
		});

	}

	ngOnInit() { }

}
