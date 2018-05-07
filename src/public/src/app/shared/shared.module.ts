/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/*
 * Components
 * */
import {
	RatingBarComponent,
	RatingBoxComponent,
	SearchBarComponent
} from './components';

/*
 * Directives
 * */
import {
	EqualValidator,
	FocusOnLoadDirective
} from './directives';

/*
 * Services (NOT shared)
 * */
import { RatingGradientService } from './components/ratings/rating-gradient.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [
		EqualValidator,
		FocusOnLoadDirective,
		RatingBarComponent,
		RatingBoxComponent,
		SearchBarComponent
	],
	exports: [
		EqualValidator
		FocusOnLoadDirective,
		RatingBarComponent,
		RatingBoxComponent,
		SearchBarComponent
	],
	providers: [
		RatingGradientService
	]
})
export class SharedModule { }
