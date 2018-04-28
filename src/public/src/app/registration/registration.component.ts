/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { SignupService } from '../shared/services/index';
import { User, SignupService } from '../shared';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

	public user: User;
	public myForm: FormGroup;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private signup: SignupService
	) { }

	ngOnInit() {
		this.user = new User();

		
		this.myForm = new FormGroup({
			name: new FormGroup({
				firstName: new FormControl('', Validators.required), 
				lastName: new FormControl('', Validators.required),
			}),
			email: new FormControl('', [ 
				Validators.required,
				Validators.pattern("[^ @]*@[^ @]*") 
			]),
			password: new FormControl('', [
				Validators.minLength(8), 
				Validators.required
			]),


		});
		

	}

	
	public save(){
		this.user.id = 15789;
		this.signup.add(this.user).subscribe(x => {
			this.router.navigateByUrl('user/{user.id}');
		});
	}
	
	

}
