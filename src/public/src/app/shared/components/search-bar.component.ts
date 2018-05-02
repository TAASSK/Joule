/*
 * Angular library
 * */
import {
	Component,
	Input,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute,
	NavigationExtras,
	Router
} from '@angular/router';

@Component({
	selector: 'app-search-bar',
	template: `
		<input
		 type="search"
		 class="nav-search-bar"
		 placeholder="Search"
		 (keyup.enter)="search(searchBar.value);"
		 #searchBar
		 [value]="query"
		>
	`
})
export class SearchBarComponent implements OnInit {

	@Input()
	query: string = '';

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() { }

	search(query: string) {

		let navigationExtras: NavigationExtras = {
			queryParams: {
				'q': query
			}
		};

		this.router.navigate(['/search'], navigationExtras);

	}

}
