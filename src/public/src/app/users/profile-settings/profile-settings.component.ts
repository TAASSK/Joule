/*
 * Angular library
 * */
import {
	Component,
	OnInit
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import {
	ActivatedRoute,
	Router
} from '@angular/router';

/*
 * Models
 * */
import { User } from '../../shared';

/*
 * Services
 * */
import {
	AuthenticationService,
	UserService
} from '../../core/services';

@Component({
	selector: 'app-profile-settings',
	templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {

	user: User = new User();
	settingsChangeForm: FormGroup;

	constructor(
		private authentication: AuthenticationService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {

		// this.user = this.userService.currentUser;

		// ***********************************
		// THIS IS DUMMY DATA -- REMOVE WITH WORKING API
		// ***********************************
		this.user.firstName = "James";
		this.user.lastName = "Joule";
		this.user.email = "jp.joule18@gojoule.me";
		// ***********************************
		// THIS IS DUMMY DATA -- REMOVE WITH WORKING API
		// ***********************************

		this.route.params.subscribe(params => {
			this.userService.getById(+params['id']).subscribe(res => {
				var tmpUser = new User();
				this.user = tmpUser.deserialize(res);
			});
		});

		this.createSettingsChangeForm();

	}

	ngOnInit() { }

	createSettingsChangeForm() {

		this.settingsChangeForm = this.fb.group({
			firstName: [
				this.user.firstName,
				Validators.required
			],
			lastName: [
				this.user.lastName,
				Validators.required
			],
			email: [
				this.user.email,
				Validators.required
			],
			jobTitle: this.user.jobTitle || '',
			employer: this.user.employer || '',
			location: this.user.location || ''
		});

	}

	prepareUser(): User {

		const formModel = this.settingsChangeForm.value;

		var updatedUser: User = new User();

		updatedUser.firstName = formModel.firstName as string;
		updatedUser.lastName = formModel.lastName as string;
		updatedUser.email = formModel.email as string;
		updatedUser.jobTitle = formModel.jobTitle as string;
		updatedUser.employer = formModel.employer as string;
		updatedUser.location = formModel.location as string;

		return updatedUser;
	}

	updateUser() {

		this.user = this.prepareUser();

		this.userService.update(
			this.user
		).subscribe(x => {
			console.log('Successfully updated user: ', this.user);
		});

	}

}
