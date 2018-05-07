/*
 * Angular library
 * */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
 * Components
 * */
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';

const routes: Routes = [
	{ path: 'user/:id', component: ProfileComponent },
	{
		path: 'user/:id/account',
		component: AccountComponent,
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'profile' },
			{ path: 'profile', component: ProfileSettingsComponent },
			{ path: 'security', component: SecuritySettingsComponent }
		]
	}
];

@NgModule({
imports: [ RouterModule.forChild(routes) ],
exports: [ RouterModule ]
})
export class UsersRoutingModule { }
