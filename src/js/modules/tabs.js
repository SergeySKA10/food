'use strict';

function tabs() {
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

	tabsHeader.addEventListener('click', (e) => {
		if (e.target && e.target.matches('.tabheader__item')) {
			tabs.forEach((tab, ind) => {
				if (e.target == tab) {
					hiddeTabContent(tabs, tabsContent);
					showTabContent(tabs, tabsContent, ind);
				}
			});
		}
	});
}

module.exports = tabs;