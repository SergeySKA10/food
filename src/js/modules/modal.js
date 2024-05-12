'use strict';

function modal() {
	const modalBtns = document.querySelectorAll('[data-modal]'),
		  modalWindow = document.querySelector('.modal');

	//функция открытия модального окна

	function openModalWindow() {
		modalWindow.classList.add('show');
		modalWindow.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(timerOpenModalWindowId);
	}
	
	modalBtns.forEach(btn => {
		btn.addEventListener('click', openModalWindow);
	});

	//функция закрытия модального окна

	function closeModalWindow() {
		modalWindow.classList.remove('show');
		modalWindow.classList.add('hide');
		document.body.style.overflow = '';
	}

	//Варианты закрытия модального окна: клик на close или вне модальное окно, клавиша escape

	modalWindow.addEventListener('click', (e) => {
		if (e.target.getAttribute('data-close') == '' || e.target === modalWindow) {
			closeModalWindow();
		}
		
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModalWindow();
		}
	});

	//Варианты открытия модального кона: таймер - через 60с; прокрутка в конец сайта

	const timerOpenModalWindowId = setTimeout(openModalWindow, 60000);

	function scrollOpenModalWindow() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModalWindow();
			window.removeEventListener('scroll', scrollOpenModalWindow);
		}
	}

	window.addEventListener('scroll', scrollOpenModalWindow);  
}

module.exports = modal;