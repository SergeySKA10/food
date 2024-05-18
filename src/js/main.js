'use strict';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import card from './modules/card';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModalWindow } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

	//Варианты открытия модального кона: таймер - через 60с
	const timerOpenModalWindowId = setTimeout(() => openModalWindow(selectorModal, timerOpenModalWindowId), 60000);

	tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
	timer('.timer', '2024-05-20');
	modal('[data-modal]', '.modal', timerOpenModalWindowId);
	card();
	form('form', '.modal', timerOpenModalWindowId);
	calc();
	slider({
		sliderSelector: '.offer__slide',
		slide: '.offer__slider',
		wrapper: '.offer__slider-wrapper',
		totalCounter: '#total',
		arrows: '.offer__slider-counter',
		field: '.offer__slider-inner',
		currentCounter: '#current'
	});

});
