/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*
 * Modules
 * */
import { CountUpModule } from 'countup.js-angular2';
import { UsersRoutingModule } from './users-routing.module';

/*
 * Components
 * */
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { ReviewComponent } from './review/review.component';
import { RatingBoxComponent } from './rating-box/rating-box.component';

@NgModule({
	imports: [
		CommonModule,
		CountUpModule,
		FormsModule,
		UsersRoutingModule
	],
	declarations: [
		ProfileComponent,
		AccountComponent,
		ReviewComponent,
		RatingBoxComponent
	],
	providers: [  ]
})
export class UsersModule { }
