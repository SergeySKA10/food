'use strict';
import { openModalWindow, closeModalWindow } from './modal';
import { postData } from '../services/services';

function form(selectorForm, selectorModal, timerID) {
	const forms = document.querySelectorAll(selectorForm);

	// сообщения пользователю после submit

	const message = {
		loading: 'img/spinner.svg',
		success: 'Спасибо! Менеджер свяжется с Вами в ближайшее время',
		failure: 'Что-то пошло не так...'
	};

	// реализация функции на каждой форме

	forms.forEach(form => {
		bindPostData(form);
	});

	// функция по отправке POST запроса

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form),
				  json = JSON.stringify(Object.fromEntries(formData.entries())); // преобразование formData в массив  => из масива в объект => объект в JSON
			
			postData('http://localhost:3000/requests', json) 
				.then(data => {
					console.log(data);
					showResponseToUserRequest(message.success);
				}).catch(() => {
					showResponseToUserRequest(message.failure);
				}).finally(() => {
					statusMessage.remove();
					form.reset();
				});
		});
	}

	// Функция по отображению ответа пользователю после отправки формы

	function showResponseToUserRequest(message) {
		const prevModalDilog = document.querySelector('.modal__dialog');
		prevModalDilog.classList.add('hide');
		
		openModalWindow(selectorModal, timerID);

		const modalThanks = document.createElement('div');
		modalThanks.classList.add('modal__dialog');
		modalThanks.innerHTML = `
			<div class="modal__content">	
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector(selectorModal).append(modalThanks);

		// закрытие модального окна благодарности и возвращение модального кона в исходное состояние

		setTimeout(() => {
			modalThanks.remove();
			prevModalDilog.classList.remove('hide');
			closeModalWindow(selectorModal);
		}, 3000);

	}   
}

export default form;