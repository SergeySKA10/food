/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/


document.addEventListener('DOMContentLoaded', () => {
  // Tabs

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

  //Timer

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

  //Modal

  const modalBtns = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal'),
    closeWindow = document.querySelector('[data-close]');

  //функция открытия модального окна

  function openModalWindow() {
    modalWindow.classList.toggle('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(timerOpenModalWindowId);
  }
  modalBtns.forEach(btn => {
    btn.addEventListener('click', openModalWindow);
  });

  //функция закрытия модального окна

  function closeModalWindow() {
    modalWindow.classList.toggle('hide');
    document.body.style.overflow = '';
  }

  //Варианты закрытия модального окна: клик на close или вне модальное окно, клавиша escape

  modalWindow.addEventListener('click', e => {
    if (e.target === closeWindow || e.target === modalWindow) {
      closeModalWindow();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && !modalWindow.classList.contains('hide')) {
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

  // Menu Cards (class ES6)

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
    create() {
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
  new MenuCard('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, '.menu__field .container').create();
  new MenuCard('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 14, '.menu__field .container', 'menu__item', 'new').create();
  new MenuCard('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 11, '.menu__field .container', 'menu__item').create();
});
/******/ })()
;
//# sourceMappingURL=script.js.map