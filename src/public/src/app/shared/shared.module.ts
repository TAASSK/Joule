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
import { FocusOnLoadDirective } from './directives/focus-on-load.directive';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [
		FocusOnLoadDirective,
		RatingBarComponent,
		RatingBoxComponent,
		SearchBarComponent
	],
	exports: [
		FocusOnLoadDirective,
		RatingBarComponent,
		RatingBoxComponent,
		SearchBarComponent
	]
})
export class SharedModule { }
