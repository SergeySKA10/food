'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import card from './modules/card';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModalWindow } from './modules/modal';
import cookiesConsent from './modules/cookieConsent';

document.addEventListener('DOMContentLoaded', () => {

	//Варианты открытия модального кона: таймер - через 60с
	const timerOpenModalWindowId = setTimeout(() => openModalWindow('.modal', timerOpenModalWindowId), 60000);

	tabs({
		perentSelectorTabs: '.tabheader__items',
		tabsSelector: '.tabheader__item',
		contentSelector: '.tabcontent',
		classActive: 'tabheader__item_active',
		classShow: 'show',
		classHide: 'hide',
		classAnimation: 'fade'
	});
	
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
		currentCounter: '#current',
		color: '#fff'
	});
	cookiesConsent({
		backgroundColor: '', 
		height: '', 
		text: '', 
		textColor: '', 
		link: '', 
		linkColor: '', 
		btnBorder: '', 
		btnTextColor: '', 
		nameConsent: '',
		cancel: '',
		confirm: ''
	});

});
