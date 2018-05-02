/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

/*
 * Modules
 * */
import { CountUpModule } from 'countup.js-angular2';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

/*
 * Components
 * */
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ReviewComponent } from './review/review.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';



@NgModule({
	imports: [
		CommonModule,
		CountUpModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		UsersRoutingModule
	],
	declarations: [
		AccountComponent,
		ProfileComponent,
		ProfileSettingsComponent,
		ReviewComponent,
		SecuritySettingsComponent
	],
	providers: [  ]
})
export class UsersModule { }
