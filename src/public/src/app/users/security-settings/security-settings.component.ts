/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';

/*
 * Models
 * */
import { User } from '../../shared';
import { FormGroup, FormControl, Validators, ReactiveFormsModule , FormBuilder} from '@angular/forms';
import { userService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-security-settings',
	templateUrl: './security-settings.component.html'
})
export class SecuritySettingsComponent implements OnInit {

	user: User;
	myForm: FormGroup;
	titleAlert:string = 'This field is required';
	newPassword: string;
	confirmPassword: string;

	constructor(private form: FormBuilder, 
		private userService: userService,
		private router: Router,
		private route: ActivatedRoute,
	) {

		/*
		this.user = new User();

		this.user.id = 101;
		this.user.email = 'jp.joule18@gojoule.me';
		this.user.firstName = 'John';
		this.user.lastName = 'Doe';
		this.user.jobTitle = 'Employee';
		this.user.employer = 'Random Corp.';
		this.user.location = 'Dallas, TX';
		*/

	}
	ngOnInit() {
		this.user = new User();
		this.route.params.subscribe((params: any) => {
			this.user.id = params.user_id;
			console.log(params);
			let num = params.user_id;
			if(num) {
			  this.userService.getById(+num).subscribe(data => {
				this.user = this.user.deserialize(data);     
				console.log(data);  
				console.log(this.user);  
			  });
			}
		});
		console.log(this.user);


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

		this.userService.updatePassword(this.user, this.user.id).subscribe(x => {
			this.router.navigateByUrl('login');
		});
	 }
	 public delete()
	 {
		this.userService.delete(this.user.id).subscribe(x => {
			this.router.navigateByUrl('home');
		});
	 }

}
