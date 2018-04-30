/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
		FocusOnLoadDirective
	],
	exports: [
		FocusOnLoadDirective
	]
})
export class SharedModule { }
