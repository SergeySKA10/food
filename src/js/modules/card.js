'use strict';

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

	// функция получения данных из db.json для карточек меню

	const getResource = async (url) => {
		const result = await fetch(url);

		// проверяем статус запроса

		if (!result.ok) {
			throw new Error(`Could not fetch ${url}, status: ${result.status}`); // создаем ошибку для вывода статуса если статус запроса fetch не ok (200)
		}

		return await result.json();
	};

	// создание карточек меню на странице

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
			});
		});   
}

module.exports = card;