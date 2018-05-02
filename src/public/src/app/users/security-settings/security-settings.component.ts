/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';

/*
 * Models
 * */
import { User } from '../../shared';
import { FormGroup, FormControl, Validators, ReactiveFormsModule , FormBuilder} from '@angular/forms';


@Component({
	selector: 'app-security-settings',
	templateUrl: './security-settings.component.html'
})
export class SecuritySettingsComponent implements OnInit {

	user: User;
	myForm: FormGroup;
	titleAlert:string = 'This field is required';

	constructor(private form: FormBuilder) {

		this.user = new User();

		this.user.id = 101;
		this.user.email = 'jp.joule18@gojoule.me';
		this.user.firstName = 'John';
		this.user.lastName = 'Doe';
		this.user.jobTitle = 'Employee';
		this.user.employer = 'Random Corp.';
		this.user.location = 'Dallas, TX';

	}

	ngOnInit() {
		this.myForm = new FormGroup({
			'currentPassword': new FormControl('', [
				Validators.minLength(8), 
				Validators.required
			]),
			'newPassword': new FormControl('', [
				Validators.minLength(8), 
				Validators.required
			]),
			'confirmPassword': new FormControl('', [
				Validators.minLength(8), 
				Validators.required
			]),
			
		});
	 }
	 public passwordChange()
	 {
		console.log("Passwords Match");
	 }

}
