/*
 * Equal Validator Directive
 * --------------------------
 *
 * Compares two form elements for equality. Mainly used for
 * password/confirm password form elements.
 *
 * Angular implementation originally found here:
 *	https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2#toc-custom-confirm-password-validator
 * */

/*
 * Angular library
 * */
import {
	Attribute,
	Directive,
	forwardRef
} from '@angular/core';
import {
	AbstractControl,
	NG_VALIDATORS,
	Validator
} from '@angular/forms';

@Directive({
	selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => EqualValidator),
			multi: true
		}
	]
})
export class EqualValidator implements Validator {

	constructor(
		@Attribute('validateEqual') public validateEqual: string,
		@Attribute('reverse') public reverse: string
	) {}

	private get isReverse() {
		if(!this.reverse) { return false; }

		return this.reverse === 'true';
	}

	validate(ctrl: AbstractControl): { [key: string]: any } {

		// comparer value (e.g. confirm password)
		let comparer = ctrl.value;

		// compared value (e.g. original password)
		let control = ctrl.root.get(this.validateEqual);

		// values are not equal
		if(control && comparer !== control.value) {
			return { validateEqual: false };
		}

		if(control && comparer === control.value && this.isReverse) {
			delete control.errors['validateEqual'];
			if(!Object.keys(control.errors).length) {
				control.setErrors(null);
			}
		}

		if(control && comparer !== control.value && this.isReverse) {
			control.setErrors({ validateEqual: false });
		}

		return null;

	}

}
