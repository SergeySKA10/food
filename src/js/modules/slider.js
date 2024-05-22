'use strict';

function slider({sliderSelector, arrows, currentCounter, totalCounter, wrapper, field, slide, color}) {
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
	
	const calcCurrent = (i) => {
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

	sliderArrow.addEventListener('click', (e) => {
		
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
			background-color: ${color};
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
		dot.addEventListener('click', (e) => {
			const slideNum = e.target.getAttribute('data-slide-to');

			offset = stringToDigits(width) * (slideNum - 1);
			sliderField.style.transform = `translateX(-${offset}px)`;

			index = slideNum;
			calcCurrent(index);
			indicateDots(dots);
		});
	}); 
}

export default slider;