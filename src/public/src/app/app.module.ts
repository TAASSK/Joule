/*
 * Angular library
 * */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
 * Modules
 * */
import { CoreModule } from './core/core.module';
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
		CoreModule,
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
		ReactiveFormsModule,
		SharedModule,
		UsersModule
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
