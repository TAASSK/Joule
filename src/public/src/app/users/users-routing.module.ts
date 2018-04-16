/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
 * Modules
 * */

/*
 * Components
 * */
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class UsersRoutingModule { }
