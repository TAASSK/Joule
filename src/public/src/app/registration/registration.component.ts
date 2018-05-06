/*
 * Angular library
 * */
import {
	Component,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute,
	Router
} from '@angular/router';

import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';

/*
 * Models
 * */
import { User } from '../shared';

/*
 * Services
 * */
import { UserService } from '../core/services';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

	user: User = new User();
	registrationForm: FormGroup;
	titleAlert: string = 'This field is required';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private userService: UserService
	) {
		this.createRegistrationForm();
	}

	ngOnInit() { }

	createRegistrationForm() {

		this.registrationForm = this.fb.group({
			email: [
				'', Validators.compose([
					Validators.required,
					Validators.pattern(
						'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
					)
				])
			],
			firstName: [
				'',
				Validators.required
			],
			lastName: [
				'',
				Validators.required
			],
			password: [
				'', Validators.compose([
					Validators.minLength(8),
					Validators.required
				])
			]
		});

	}

	onSubmit() {
		this.user = this.prepareUser();
		this.userService.add(this.user);
		this.router.navigate(['login']);
	}

	prepareUser(): User {

		const formModel = this.registrationForm.value;

		var saveUser: User = new User();

		saveUser.email = formModel.email as string;
		saveUser.firstName = formModel.firstName as string;
		saveUser.lastName = formModel.lastName as string;
		saveUser.password = formModel.password as string;

		return saveUser;
	}

}
