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
import { UsersModule } from './users/users.module';

/*
 * Components
 * */
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

let defaultRoute = 'home';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		LoginComponent,
		RegistrationComponent
	],
	imports: [
        UsersModule,
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: 'home', component: HomePageComponent },
			{ path: 'login', component: LoginComponent },
			{ path: 'registration', component: RegistrationComponent },
			{ path: '', redirectTo: defaultRoute, pathMatch: 'full' },
			{ path: '**', redirectTo: defaultRoute, pathMatch: 'full' }
		])
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
