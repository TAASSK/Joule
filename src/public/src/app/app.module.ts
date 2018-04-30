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
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './users/profile/profile.component';

/*
 * Services
 * */
import {
	AuthenticationService,
	SignupService
} from './shared';

let defaultRoute = 'home';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		LoginComponent,
		RegistrationComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: 'home', component: HomePageComponent },
			{ path: 'login', component: LoginComponent },
			{ path: 'registration', component: RegistrationComponent },
			{ path: '', redirectTo: defaultRoute, pathMatch: 'full' },
			{ path: '**', redirectTo: defaultRoute, pathMatch: 'full' }
		]),
		SharedModule,
		UsersModule
	],
	providers: [
		AuthenticationService,
		SignupService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
