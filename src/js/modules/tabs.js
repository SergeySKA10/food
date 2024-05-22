'use strict';

function tabs({perentSelectorTabs, tabsSelector, contentSelector, classActive, classShow, classHide, classAnimation}) {
	const tabsHeader = document.querySelector(perentSelectorTabs),
		  tabs = document.querySelectorAll(tabsSelector),
		  tabsContent = document.querySelectorAll(contentSelector);

	//Функция скрытия контента

	function hiddeTabContent(els, contents) {
		els.forEach(tab => {
			tab.classList.remove(classActive);
		});

		contents.forEach(item => {
			item.classList.add(classHide);
			item.classList.remove(classShow, classAnimation);
		});
	}

	//Функция показа контента

	function showTabContent(els, contents, i = 0) {
		els[i].classList.add(classActive);
		contents[i].classList.add(classShow, classAnimation);
		contents[i].classList.remove(classHide);
	}

	hiddeTabContent(tabs, tabsContent);
	showTabContent(tabs, tabsContent);

	//Обработчик на табы

	tabsHeader.addEventListener('click', (e) => {
		if (e.target && e.target.matches(tabsSelector)) {
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