/*
 * Angular library
 * */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/*
 * Modules
 * */
import { AccountsModule } from './accounts/accounts.module';

/*
 * Components
 * */
import { AppComponent } from './app.component';

let defaultRoute = 'home';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
        AccountsModule,
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: defaultRoute, pathMatch: 'full' }
		])
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
