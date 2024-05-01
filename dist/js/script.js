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
    total = document.querySelector('#total');
  let index = 0;
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }
  const toggleSlides = i => {
    slides.forEach(slide => {
      slide.classList.add('hide');
    });
    slides[i].classList.toggle('hide');
    if (index < 10) {
      current.textContent = `0${index + 1}`;
    } else {
      current.textContent = index + 1;
    }
  };
  toggleSlides(index);
  const showSlide = n => {
    index += n;
    if (index > slides.length - 1) {
      index = 0;
    }
    if (index < 0) {
      index = 3;
    }
    toggleSlides(index);
  };
  sliderArrow.addEventListener('click', e => {
    if (e.target.getAttribute('data-next') == '') {
      showSlide(1);
    } else if (e.target.getAttribute('data-prev') == '') {
      showSlide(-1);
    }
  });
});
/******/ })()
;
//# sourceMappingURL=script.js.map