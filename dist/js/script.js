/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/


window.addEventListener('DOMContentLoaded', () => {
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

  //const deadline = Date.parse(new Date()) + 60000;  // реализовать функционал записи deadline в localstrage (индивидуальный таймер для каждого пользователя)

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
    const total = endtime - new Date().getTime(),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor(total / (1000 * 60 * 60) % 24),
      minutes = Math.floor(total / (1000 * 60) % 60),
      seconds = Math.floor(total / 1000 % 60);
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
});
/******/ })()
;
//# sourceMappingURL=script.js.map