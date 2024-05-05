/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/


document.addEventListener('DOMContentLoaded', () => {
  // TABS

  const tabsHeader = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent');

  //Функция скрытия контента

  function hiddeTabContent(els, contents) {
    els.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
    contents.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
  }

  //Функция показа контента

  function showTabContent(els, contents, i = 0) {
    els[i].classList.add('tabheader__item_active');
    contents[i].classList.add('show', 'fade');
    contents[i].classList.remove('hide');
  }
  hiddeTabContent(tabs, tabsContent);
  showTabContent(tabs, tabsContent);

  //Обработчик на табы

  tabsHeader.addEventListener('click', e => {
    if (e.target && e.target.matches('.tabheader__item')) {
      tabs.forEach((tab, ind) => {
        if (e.target == tab) {
          hiddeTabContent(tabs, tabsContent);
          showTabContent(tabs, tabsContent, ind);
        }
      });
    }
  });

  //TIMER

  // const deadline = Date.parse(new Date()) + 60000;  // реализовать функционал записи deadline в localstrage (индивидуальный таймер для каждого пользователя)

  const time = '2024-05-20',
    // дата окончания акции
    deadline = Date.parse(time);

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
  setClock('.timer', deadline);

  //MODAL

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

  modalWindow.addEventListener('click', e => {
    if (e.target.getAttribute('data-close') == '' || e.target === modalWindow) {
      closeModalWindow();
    }
  });
  document.addEventListener('keydown', e => {
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

  // MENU CARDS (class ES6)

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

  // функция получения данных из db.json для карточек меню

  const getResource = async url => {
    const result = await fetch(url);

    // проверяем статус запроса

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`); // создаем ошибку для вывода статуса если статус запроса fetch не ok (200)
    }
    return await result.json();
  };

  // создание карточек меню на странице

  getResource('http://localhost:3000/menu').then(data => {
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

  // FORMS

  const forms = document.querySelectorAll('form');

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

      postData('http://localhost:3000/requests', json).then(data => {
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
    openModalWindow();
    const modalThanks = document.createElement('div');
    modalThanks.classList.add('modal__dialog');
    modalThanks.innerHTML = `
			<div class="modal__content">	
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
    document.querySelector('.modal').append(modalThanks);

    // закрытие модального окна благодарности и возвращение модального кона в исходное состояние

    setTimeout(() => {
      modalThanks.remove();
      prevModalDilog.classList.remove('hide');
      closeModalWindow();
    }, 3000);
  }

  //SLIDER

  const slides = document.querySelectorAll('.offer__slide'),
    sliderArrow = document.querySelector('.offer__slider-counter'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    sliderField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(sliderWrapper).width,
    slider = document.querySelector('.offer__slider');
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

  // CALC

  const result = document.querySelector('.calculating__result span');
  let sex = 'female',
    weight,
    height,
    age,
    ratio = 1.375;
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
  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
        } else {
          sex = e.target.getAttribute('id');
        }
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
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
      calcTotal();
    });
  }
  getDynamicInformation('#weight');
  getDynamicInformation('#height');
  getDynamicInformation('#age');
});
/******/ })()
;
//# sourceMappingURL=script.js.map