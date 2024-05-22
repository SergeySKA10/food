'use strict';

function timer({timer, time, days, hours, minutes, seconds}) {
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
			  days = Math.floor(total / (1000 * 60 * 60 * 24)),
			  hours = Math.floor((total / (1000 * 60 * 60)) % 24),
			  minutes = Math.floor((total / (1000 * 60)) % 60),
			  seconds = Math.floor((total / 1000) % 60);
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

	function setClock(selector, endtime, d, h, min, sec) {
		const timer = document.querySelector(selector),
			  days = timer.querySelector(d),
			  hours = timer.querySelector(h),
			  minutes = timer.querySelector(min),
			  seconds = timer.querySelector(sec),
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

	setClock(timer, deadline, days, hours, minutes, seconds); 
}

export default timer;