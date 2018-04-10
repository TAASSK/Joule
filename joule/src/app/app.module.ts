import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FrontPageComponent } from './front-page/front-page.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegistrationComponent,
		FrontPageComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
