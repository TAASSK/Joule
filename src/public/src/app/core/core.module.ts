/*
 * Angular library
 * */
import {
	NgModule,
	Optional,
	SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';

/*
 * Services
 * */
import {
	AuthenticationService,
	AuthInterceptor,
	ReviewService,
	SearchService,
	SignupService,
	UserService
} from './services';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		AuthenticationService,
		AuthInterceptor,
		ReviewService,
		SearchService,
		SignupService,
		UserService
	]
})
export class CoreModule {

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if(parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only.'
			);
		}
	}

}
