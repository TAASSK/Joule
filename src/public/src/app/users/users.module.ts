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
// import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
imports: [
CommonModule,
UsersRoutingModule],

declarations: [
// ProfileComponent,
AccountComponent,
ReviewComponent],

providers: [  ]
})
export class UsersModule { }
