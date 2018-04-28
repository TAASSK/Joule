/*
 * Angular library
 * */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
import { ProfileComponent } from './users/profile/profile.component';

/*
 * Directives
 * */
import { FocusOnLoadDirective, SignupService } from './shared';
import { AuthenticationService } from './shared/services/authentication.service';

let defaultRoute = 'home';

@NgModule({
	declarations: [
		AppComponent,
		FocusOnLoadDirective,
		HomePageComponent,
		LoginComponent,
		RegistrationComponent
	],
	imports: [
        UsersModule,
		BrowserModule,
    HttpClientModule,
    FormsModule,
		RouterModule.forRoot([
			{ path: 'home', component: HomePageComponent },
			{ path: 'login', component: LoginComponent },
			{ path: 'registration', component: RegistrationComponent },
			{ path: 'profile', component: ProfileComponent},
			{ path: '', redirectTo: defaultRoute, pathMatch: 'full' },
			{ path: '**', redirectTo: defaultRoute, pathMatch: 'full' }
		])
	],
	providers: [SignupService, AuthenticationService],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
