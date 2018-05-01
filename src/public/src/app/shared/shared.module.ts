/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/*
 * Components
 * */
import { SearchBarComponent } from './components/search-bar.component';

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
		SearchBarComponent
	],
	exports: [
		FocusOnLoadDirective,
		SearchBarComponent
	]
})
export class SharedModule { }
