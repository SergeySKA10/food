/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  calcTotal();

  // функция переключения класса активности у статических элементов, получения их значений
  // в зависимости от выбора и записи результата в local storage

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/card.js":
/*!********************************!*\
  !*** ./src/js/modules/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function card() {
  class MenuCard {
    constructor(src, alt, title, descr, price, perentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.changeToUAH();
      this.parent = document.querySelector(perentSelector);
      this.classes = classes;
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const card = document.createElement('div');
      if (this.classes.length === 0) {
        this.classCard = 'menu__item';
        card.classList.add(this.classCard);
      } else {
        this.classes.forEach(className => card.classList.add(className));
      }
      card.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
      this.parent.append(card);
    }
  }
  ;

  // создание карточек меню на странице

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");




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
    form.addEventListener('submit', e => {
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

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModalWindow)(selectorModal, timerID);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)(selectorModal);
    }, 3000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModalWindow: () => (/* binding */ closeModalWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModalWindow: () => (/* binding */ openModalWindow)
/* harmony export */ });


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

  modalWindow.addEventListener('click', e => {
    if (e.target.getAttribute('data-close') == '' || e.target === modalWindow) {
      closeModalWindow(selectorModal);
    }
  });
  document.addEventListener('keydown', e => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function slider({
  sliderSelector,
  arrows,
  currentCounter,
  totalCounter,
  wrapper,
  field,
  slide
}) {
  const slides = document.querySelectorAll(sliderSelector),
    sliderArrow = document.querySelector(arrows),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    sliderWrapper = document.querySelector(wrapper),
    sliderField = document.querySelector(field),
    width = window.getComputedStyle(sliderWrapper).width,
    slider = document.querySelector(slide);
  let index = 1,
    offset = 0;

  // Расчет current

  const calcCurrent = i => {
    if (i < 10) {
      current.textContent = `0${i}`;
    } else {
      current.textContent = i;
    }
  };
  calcCurrent(index);

  // установка total

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }
  sliderField.style.cssText = `
		width: ${100 * slides.length}%;
		display: flex;
		transition: 0.5s all;
	`;
  slides.forEach(slide => {
    slide.style.width = width;
  });
  sliderWrapper.style.overflow = 'hidden';
  function stringToDigits(str) {
    return +str.replace(/\D/g, '');
  }

  //Перелистывание slides

  sliderArrow.addEventListener('click', e => {
    if (e.target.getAttribute('data-next') == '') {
      if (offset == stringToDigits(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += stringToDigits(width);
      }
      sliderField.style.transform = `translateX(-${offset}px)`;
      if (index == slides.length) {
        index = 1;
      } else {
        index++;
      }
      calcCurrent(index);
      indicateDots(dots);
    } else if (e.target.getAttribute('data-prev') == '') {
      if (offset == 0) {
        offset = stringToDigits(width) * (slides.length - 1);
      } else {
        offset -= stringToDigits(width);
      }
      sliderField.style.transform = `translateX(-${offset}px)`;
      if (index == 1) {
        index = slides.length;
      } else {
        index--;
      }
      calcCurrent(index);
      indicateDots(dots);
    }
  });

  // формирование и добавление dots на слайдер

  slider.style.position = 'relative';
  const dots = [];
  const dotsWrapper = document.createElement('ol');
  dotsWrapper.classList.add('carousel-indicators');
  dotsWrapper.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
  slider.append(dotsWrapper);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
    dotsWrapper.append(dot);
    if (i == 0) {
      dot.style.opacity = '1';
    }
    dots.push(dot);
  }

  // функция индикации точек

  function indicateDots(arr) {
    arr.forEach((el, ind) => {
      el.style.opacity = '0.5';
      if (ind == index - 1) {
        el.style.opacity = '1';
      }
    });
  }

  // переключение слайдов при нажатии на dots

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideNum = e.target.getAttribute('data-slide-to');
      offset = stringToDigits(width) * (slideNum - 1);
      sliderField.style.transform = `translateX(-${offset}px)`;
      index = slideNum;
      calcCurrent(index);
      indicateDots(dots);
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function tabs(perentSelectorTabs, selectorTab, selectorContent, classActive) {
  const tabsHeader = document.querySelector(perentSelectorTabs),
    tabs = document.querySelectorAll(selectorTab),
    tabsContent = document.querySelectorAll(selectorContent);

  //Функция скрытия контента

  function hiddeTabContent(els, contents) {
    els.forEach(tab => {
      tab.classList.remove(classActive);
    });
    contents.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
  }

  //Функция показа контента

  function showTabContent(els, contents, i = 0) {
    els[i].classList.add(classActive);
    contents[i].classList.add('show', 'fade');
    contents[i].classList.remove('hide');
  }
  hiddeTabContent(tabs, tabsContent);
  showTabContent(tabs, tabsContent);

  //Обработчик на табы

  tabsHeader.addEventListener('click', e => {
    if (e.target && e.target.matches(selectorTab)) {
      tabs.forEach((tab, ind) => {
        if (e.target == tab) {
          hiddeTabContent(tabs, tabsContent);
          showTabContent(tabs, tabsContent, ind);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function timer(selectorTimer, time) {
  const deadline = Date.parse(time);

  //Функция добавления 0 для значений в таймере которые < 10

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  //Функция получения временных значений до окончания акции 

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const total = endtime - new Date().getTime();
    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24)), hours = Math.floor(total / (1000 * 60 * 60) % 24), minutes = Math.floor(total / (1000 * 60) % 60), seconds = Math.floor(total / 1000 % 60);
    }
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  //Функция установки часов и внутренняя функция обновления часов с их остановкой

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(selectorTimer, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });


// функция по отправке данных на сервер
const postData = async (url, data) => {
  // используем fetch для запроса
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await result.json();
};

// функция получения данных из db.json для карточек меню

const getResource = async url => {
  const result = await fetch(url);

  // проверяем статус запроса

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`); // создаем ошибку для вывода статуса если статус запроса fetch не ok (200)
  }
  return await result.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/card */ "./src/js/modules/card.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");










document.addEventListener('DOMContentLoaded', () => {
  //Варианты открытия модального кона: таймер - через 60с
  const timerOpenModalWindowId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModalWindow)(selectorModal, timerOpenModalWindowId), 60000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2024-05-20');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', timerOpenModalWindowId);
  (0,_modules_card__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('form', '.modal', timerOpenModalWindowId);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    sliderSelector: '.offer__slide',
    slide: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    totalCounter: '#total',
    arrows: '.offer__slider-counter',
    field: '.offer__slider-inner',
    currentCounter: '#current'
  });
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map