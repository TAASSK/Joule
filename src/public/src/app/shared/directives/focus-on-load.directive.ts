/*
 * Focus On Load Directive
 * ------------------------
 *
 * Automatically focusses on form element on loading of the page.
 *
 * Angular implementation originally found here:
 *	https://github.com/smu-geode/uomi/blob/master/src/public/app/shared/focus-on-load.directive.ts
 * */

/*
 * Angular library
 * */
 import {
 	AfterContentChecked,
 	Directive,
 	ElementRef
 } from '@angular/core';

@Directive({ selector: '[focusOnLoad]' })
export class FocusOnLoadDirective implements AfterContentChecked {

	private isFocused: boolean = false;

	constructor(
		private element: ElementRef
	) {}

	ngAfterContentChecked() {
		this.doFocus();
	}

	doFocus() {
		if(!this.isFocused) {
			this.element.nativeElement.focus();
			this.isFocused = true;
		}
	}

}
