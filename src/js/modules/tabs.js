'use strict';

function tabs(perentSelectorTabs, selectorTab, selectorContent, classActive) {
	const tabsHeader = document.querySelector(perentSelectorTabs),
		  tabs = document.querySelectorAll(selectorTab),
		  tabsContent = document.querySelectorAll(selectorContent);

	//Функция скрытия контента

	function hiddeTabContent(els, contents) {
		els.forEach(tab => {
			tab.classList.remove(classActive);
		});

		contents.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
	}

	//Функция показа контента

	function showTabContent(els, contents, i = 0) {
		els[i].classList.add(classActive);
		contents[i].classList.add('show', 'fade');
		contents[i].classList.remove('hide');
	}

	hiddeTabContent(tabs, tabsContent);
	showTabContent(tabs, tabsContent);

	//Обработчик на табы

	tabsHeader.addEventListener('click', (e) => {
		if (e.target && e.target.matches(selectorTab)) {
			tabs.forEach((tab, ind) => {
				if (e.target == tab) {
					hiddeTabContent(tabs, tabsContent);
					showTabContent(tabs, tabsContent, ind);
				}
			});
		}
	});
}

export default tabs;