import { Component, OnInit } from '@angular/core';
import '../../../css/styles.css';
import '../../../css/_profile.css';
let progress = require('progressbar.js');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() { }


}
drawCircle(value ){
    let draw = new progress.Circle(container, {
	strokeWidth: 6,
	easing: 'easeInOut',
	duration: 1400,
	color: '#FFEA82',
	trailColor: '#eee',
	trailWidth: 1,
	svgStyle: null
});
  	draw.animate(1.0)

}

