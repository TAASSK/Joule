/*
 * Angular library
 * */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/*
 * Modules
 * */
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';

/*
 * Components
 * */
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchResultsComponent } from './search-results/search-results.component';

/*
 * Services
 * */
import {
	AuthenticationService,
	RatingGradientService,
	SignupService
} from './shared';

let defaultRoute = 'home';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		LoginComponent,
		RegistrationComponent,
		SearchResultsComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: 'home', component: HomePageComponent },
			{ path: 'login', component: LoginComponent },
			{ path: 'registration', component: RegistrationComponent },
			{ path: 'search', component: SearchResultsComponent },
			{ path: '', redirectTo: defaultRoute, pathMatch: 'full' },
			{ path: '**', redirectTo: defaultRoute, pathMatch: 'full' }
		]),
		SharedModule,
		UsersModule
	],
	providers: [
		AuthenticationService,
		RatingGradientService,
		SignupService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
