/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*
 * Modules
 * */
import { AccountsRoutingModule } from './accounts-routing.module';

/*
 * Components
 * */
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
	imports: [
		CommonModule,
		AccountsRoutingModule
	],
	declarations: [
		HomePageComponent,
		LoginComponent,
		RegistrationComponent
	],
	providers: [  ]
})
export class AccountsModule { }
