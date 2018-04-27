/*
 * Angular library
 * */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

	username: string = 'John Doe';
	jobTitle: string = 'Employee';
	workPlace: string = 'Random Corp.';

	overallRating: number = 0.70;
	recommend: number = 1;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() { }

	gotoAccount(id: number) {
		this.router.navigateByUrl('/user/'+String(id)+'/account');
	}

	// Interpolated color palette based on Seaborn Cubehelix Colormap
	//
	// These are 4th-degree polynomial fits to the RGB components of the
	// colormap that take a value between 0 and 100, outputting a number
	// between 0 and 255 representing the output color.
	//
	// :param: `percent` is a number between 0 and 1
	//
	// Return Value:
	// 	- CSS color string in RGB form
	ratingGradient(percent: number): string {

		percent = 100 - (percent * 100);

		// red
		let rf = x => ((((1.4317645437860544e-06*x+-0.00021119131538481535)*x+-0.004803227466730371)*x+-0.788909872919142)*x+237.39592406829988);

		// green
		let gf = x => ((((-8.266706357942017e-07*x+0.0001653795179656395)*x+-0.0036778709750931605)*x+-2.2620080346030393)*x+209.10301449934522);

		// blue
		let bf = x => ((((5.291652309892023e-07*x+-0.0002936277501279425)*x+0.030237463445120513)*x+-2.064732910864519)*x+203.595086377286);

		var r = Math.round(rf(percent));
		var g = Math.round(gf(percent));
		var b = Math.round(bf(percent));

		return `rgb(${r},${g},${b})`;

	}



}

