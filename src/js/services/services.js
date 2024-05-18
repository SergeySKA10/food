'use strict';

// функция по отправке данных на сервер

const postData = async (url, data) => {
	// используем fetch для запроса
	const result = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});

	return await result.json();
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

export {postData, getResource};