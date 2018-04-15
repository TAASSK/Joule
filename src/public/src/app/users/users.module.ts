/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*
 * Modules
 * */
import { UsersRoutingModule } from './users-routing.module';

/*
 * Components
 * */
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
	imports: [
		CommonModule,
		UsersRoutingModule
	],
	declarations: [
		HomePageComponent,
		LoginComponent,
		RegistrationComponent
	],
	providers: [  ]
})
export class UsersModule { }
