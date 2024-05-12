'use strict';

function calc() {
	const result = document.querySelector('.calculating__result span');
	let sex, weight, height, age, ratio;

	// функция расчета изначальных значений статических элементов

	const initStaticInformation = (key, value) => {
		if (localStorage.getItem(key)) {
			return localStorage.getItem(key);
		} else {
			localStorage.setItem(key, value);
			return value;
		}
	};

	sex = initStaticInformation('sex', 'female');
	ratio = initStaticInformation('ratio', 1.375);

	// функция установки класса активности исходя из начальных значений статических элементов

	function initLocalSettingCalc(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}

			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettingCalc('#gender div', 'calculating__choose-item_active');
	initLocalSettingCalc('.calculating__choose_big div', 'calculating__choose-item_active');

	// функция подсчета итогового результата

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	// функция переключения класса активности у статических элементов, получения их значений
	// в зависимости от выбора и записи результата в local storage

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}
	
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
				
				e.target.classList.add(activeClass);
	
				calcTotal();
			});
		});
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	// функция получения значений динамических элементов в зависимости от введенных данных с проверкой value

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = '';
				switch (input.getAttribute('id')) {
				case 'weight':
					weight = +input.value;
					break;
				case 'height':
					height = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
				}
			}

			calcTotal();
		});
	}

	getDynamicInformation('#weight');
	getDynamicInformation('#height');
	getDynamicInformation('#age');
}

module.exports = calc;