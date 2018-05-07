/*
 * Angular library
 * */
import {
	Component,
	OnInit
	} from '@angular/core';
import {
	Router,
	ActivatedRoute
} from '@angular/router';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';

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
	selector: 'app-security-settings',
	templateUrl: './security-settings.component.html'
})
export class SecuritySettingsComponent implements OnInit {

	user: User = new User();
	passwordChangeForm: FormGroup;

	constructor(
		private authentication: AuthenticationService,
		private fb: FormBuilder, 
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {
		this.createPasswordChangeForm();
	}

	ngOnInit() {

		// this.user = this.userService.currentUser;

		this.route.params.subscribe(params => {
			this.userService.getById(+params['id']).subscribe(res => {
				var tmpUser = new User();
				this.user = tmpUser.deserialize(res);
			});
		});

	}

	createPasswordChangeForm() {

		// TODO: currentPassword form element actually needs to call
		// the login input to, you know, actually check the password
		this.passwordChangeForm = this.fb.group({
			currentPassword: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(8)
				])
			],
			newPassword: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(8)
				])
			],
			confirmNewPassword: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(8)
				])
			]
		});

	}

	onSubmit() {

		this.user = this.prepareUser();

		this.userService.update(
			this.user
		).subscribe(x => {
			this.router.navigateByUrl('login');
		});

	}

	prepareUser(): User {

		const formModel = this.passwordChangeForm.value;

		var updateUser: User = new User();

		updateUser.id = this.user.id;
		updateUser.password = formModel.newPassword as string;

		return updateUser;

	}

	deleteUser() {

		if(confirm('This action cannot be undone. Only click \'OK\' if you\'re certain that you wish to delete your account')) {
			this.userService.delete(this.user.id).subscribe(x => {
				this.router.navigate(['home']);
			});
		}

	}

}
