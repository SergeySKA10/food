'use strict';

document.addEventListener('DOMContentLoaded', () => {

	const tabs = require('./modules/tabs'),
		  timer = require('./modules/timer'),
		  modal = require('./modules/modal'),
		  card = require('./modules/card'),
		  form = require('./modules/form'),
		  slider = require('./modules/slider'),
		  calc = require('./modules/calc');


	tabs();
	timer();
	modal();
	card();
	form();
	slider();
	calc();

});
