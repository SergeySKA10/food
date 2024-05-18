'use strict';

import { getResource } from '../services/services';

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
			
	};

	// создание карточек меню на странице

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
			});
		});   
}

export default card;