'use strict';

window.addEventListener('DOMContentLoaded', () => {

	const tabsHeader = document.querySelector('.tabheader__items'),
		  tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent');

	function hiddeTabContent(els, contents) {
		els.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});

		contents.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
	}

	function showTabContent(els, contents, i = 0) {
		els[i].classList.add('tabheader__item_active');
		contents[i].classList.add('show', 'fade');
		contents[i].classList.remove('hide');
	}

	hiddeTabContent(tabs, tabsContent);
	showTabContent(tabs, tabsContent);

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

});
