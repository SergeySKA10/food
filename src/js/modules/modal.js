'use strict';

//функция открытия модального окна

function openModalWindow(selectorModal, timerID) {
	const modalWindow = document.querySelector(selectorModal);

	modalWindow.classList.add('show');
	modalWindow.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	if (timerID) {
		clearInterval(timerID);
	}
	
}

//функция закрытия модального окна

function closeModalWindow(selectorModal) {
	const modalWindow = document.querySelector(selectorModal);

	modalWindow.classList.remove('show');
	modalWindow.classList.add('hide');
	document.body.style.overflow = '';
}

// Функция Модуля модального окна

function modal(triggerSelector, selectorModal, timerID) {
	const modalBtns = document.querySelectorAll(triggerSelector),
		  modalWindow = document.querySelector(selectorModal);
	
	modalBtns.forEach(btn => {
		btn.addEventListener('click', () => openModalWindow(selectorModal, timerID));
	});

	//Варианты закрытия модального окна: клик на close или вне модальное окно, клавиша escape

	modalWindow.addEventListener('click', (e) => {
		if (e.target.getAttribute('data-close') == '' || e.target === modalWindow) {
			closeModalWindow(selectorModal);
		}
		
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModalWindow(selectorModal);
		}
	});

	function scrollOpenModalWindow() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModalWindow(selectorModal, timerID);
			window.removeEventListener('scroll', scrollOpenModalWindow);
		}
	}

	window.addEventListener('scroll', scrollOpenModalWindow);  
}

export default modal;
export { openModalWindow, closeModalWindow };