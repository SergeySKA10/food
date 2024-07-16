# food
Restaurant Webpage

RU:
Frontend разработка проекта сайта ресторана.

В этом проекте на JS реализованы:
 - табы переключения стиля питания 
 - таймер с индивидуальной обработкой даты под каждого пользлвателя
 - слайдер с возможностью переключения слайдов при клике на соответствующую стрелку (показ слледующего слайда) или точку (показ слайда в соответствии точкой).
 - калькулятор расчета калорий
 - карточки меню ресторана
 - модальное окно с формой обратной связи
 - соглашение с cookie

Проект построен на модульной структуре в императивном стиле. Для сборки модулей используется Webpack. В качестве планировщика задач используется gulp.
Таймер начинает работать после соглашения с cookies.
Появление модального окна реализовано 3 способами: при скролле страницы до конца, после 60 сек, при клике на соответствующие кнопки.
Данные с формы отправляются посредством AJAX (fetch) без перезагрузки страницы. После отправки идет соответствующее оповещение в отдельном модальном окне о статусе отправки POST запроса.
Для реализации карточек меню используются классы. Структура карточек меню строится исходя из данных в db.json. Реализовано с помощью json-server.
Для работы с таймером и калькулятором используется localStarage.

EN:
Frontend development of a restaurant website project.

This project uses JS to implement:
 - tabs for switching food style
 - timer with individual date processing for each user
 - a slider with the ability to switch slides when you click on the corresponding arrow (show the next slide) or dot (show the slide according to the dot).
 - calorie calculator
 - restaurant menu cards
 - modal window with feedback form
 - cookie agreement

The project is built on a modular structure in an imperative style. Webpack is used to build modules. Gulp is used as a task scheduler.
The timer starts running after agreeing with cookies.
The appearance of a modal window is implemented in 3 ways: when scrolling the page to the end, after 60 seconds, when clicking on the corresponding buttons.
Form data is sent via AJAX (fetch) without reloading the page. After sending, there is a corresponding notification in a separate modal window about the status of sending the POST request.
Classes are used to implement menu cards. The structure of menu cards is built based on the data in db.json. Implemented using json-server.
To work with the timer and calculator, localStarage is used.
