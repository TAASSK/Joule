/*
 * Angular library
 * */
import { Injectable } from '@angular/core';

@Injectable()
export class RatingGradientService {

	constructor() {}

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

	// compensate for lighter backgrounds at high percentage scores
	// by switching to black text
	ratingText(percent: number): string {
		return (percent > 0.70) ? '#000' : '#fff';
	}

	// return a string for CSS 'width' values
	ratingWidth(percent: number): string {
		return `${percent}%`;
	}

}
