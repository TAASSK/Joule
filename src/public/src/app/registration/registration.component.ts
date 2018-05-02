/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { SignupService } from '../shared/services/index';
import { User, SignupService } from '../shared';

import { FormGroup, FormControl, Validators, ReactiveFormsModule , FormBuilder} from '@angular/forms';
import { userService } from '../shared/services/user.service';

/*
 * Angular library
 * */

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

	user: User;
	myForm: FormGroup;
	titleAlert:string = 'This field is required';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private signup: SignupService,
		private form: FormBuilder,
		private userService: userService
	) {	}

	ngOnInit() {
		this.user = new User();

		this.myForm = new FormGroup({
			'firstName': new FormControl('', [Validators.required, Validators.minLength(4)]), 
			'lastName': new FormControl('', Validators.required),
			'email': new FormControl('', [ 
				Validators.required,
				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') 
				///^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
			]),
			'password': new FormControl('', [
				Validators.minLength(8), 
				Validators.required
			]),
		});

	}
	public save() {
	// this.user.id = 15789;
	this.signup.add(this.user).subscribe(x => {
		this.router.navigateByUrl('login');
	});
	
	//this.router.navigateByUrl('login');
	}}
