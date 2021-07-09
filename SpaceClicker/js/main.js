//Главный файл, в котором я буду вызывать необходимые функции и действия игры

// Запускаем функцию при загрузке страницы
function start() {
	// создаем стартовый блок
	sozdanieStartBlock();
	// создаем блок таймера
	startKnopka.onclick = nachat;
}

// при начале игры выполняем эту функцию
function nachat() {
	status = "nachat";
	metka1 = 7;
	// удаляем стартовый блок
	udalenieStartBlock();
	// создаем блок таймера
	sozdanieTimerBlock();
	// создаем блок очков
	sozdanieStars();
	// создаем блок жизней
	sozdanieLifes();
	// создаем шарик
	sozdanieBall();
	// запускаем таймер обратного отсчета
	//var metka;
	timerIgra();
}

// при начале игры выполняем эту функцию
function nachat1() {
	status = "nachat";
	ochki = 0;
	metka = 0;
	metka1 = 9;
	// удаляем стартовый блок
	udalenieKoniecIgra();
	// создаем блок таймера
	sozdanieTimerBlock();
	// создаем блок очков
	sozdanieStars();
	// создаем блок жизней
	sozdanieLifes();
	// создаем шарик
	sozdanieBall();
	// запускаем таймер обратного отсчета
	//var metka;
	timerIgra();
}



start();

// Функция для обратного отчета времени игры
function timerIgra() {
	var chasy = setInterval(function(){ // таймер
		// меняем текст в таймер блоке, уменьшая значение на 1
		timerBlock.innerText = timerBlock.innerText - 1; // обратный отсчет
				
		if (timerBlock.innerText == 0) {
			metka = 1;
			clearInterval(chasy); // очистка таймера
			stopIgra(); /* окончание игры */
			timerBlock.innerText = "0";
		}
		else if (colichestvoLifes === 0) {
			metka = 2;
			clearInterval(chasy); // очистка таймера
			stopIgra(); /* окончание игры */
			timerBlock.innerText = "0";
		} 
		else if (ochki >= 50 && metka1 == 7) {
			metka = 3;
			clearInterval(chasy); // очистка таймера
			stopIgra(); /* окончание игры */
			timerBlock.innerText = "0";
		} 
		else if (ochki >= 60 && metka1 == 9) {
			metka = 4;
			clearInterval(chasy); // очистка таймера
			stopIgra(); /* окончание игры */
			timerBlock.innerText = "0";
		} 



	}, 1000);

}


// скрываем елементы игры, отображаем старт
function stopIgra() {
	status = "koniec";
	udalenieStars();
	udalenieLifes();
	udalenieTimerBlock();
	setTimeout(function() {
		ochistitIgraPole();
		switch (metka) {
 			case 1:
				sozdanieKoniecIgraTime();
				knoppr.onclick = str; // при нажатии на кнопку жми - перезапуск игры
   				break;
			case 2:
				sozdanieKoniecIgraLife();
				knoppr.onclick = str; // при нажатии на кнопку жми - перезапуск игры
   				break;
			case 3:
				sozdanieKoniecIgraVin1();
				knoppr.onclick = nachat1;
   				break;
   			case 4:
				sozdanieKoniecIgraSuperVin();
				knoppr.onclick = str;
   				break;
   		}

	}, 200)	

}



/*
Перезапуск игры
*/

// при нажатии на кнопку жми - перезапуск игры
knopb.onclick = str; 


function str() {
	
	window.location.reload(); /* перезапуск игры */

}
// startBlock