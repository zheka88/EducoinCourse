// получить случайное число
function random(max) {
	// случайное число от 1 до максимума
	var sluchaynoeChislo = 1 + Math.random() * (max + 1);
	// округляем до целого числа
	sluchaynoeChislo = Math.floor(sluchaynoeChislo);
	// вернуть результат
	return sluchaynoeChislo;
}
stars
/*=========================================
Функции для создания элементов игры
=========================================*/
/*
<div id="start-block">
	<button id="start-knopka">Начать</button>
</div>
*/
// Создание блока старта игры
function sozdanieStartBlock() {
	// Создаем блок див <div id="start-block">
	startBlock = document.createElement("div");
	startBlock.id = "start-block";

	// Создаем кнопку <button id="start-knopka">Начать</button>
	startKnopka = document.createElement("button");
	startKnopka.id = "start-knopka";
	startKnopka.innerText = "Дави его! Дави!";

	// Добавляем кнопку в стартовый блок
	startBlock.appendChild(startKnopka);

	// Добавляем стартовый блок в игровое поле <div id="lifes"></div>
	igraPole.appendChild(startBlock);
}

/* 
<div className="stars"> 0 </div>
*/
// Создание блока очков
function sozdanieStars() {
	// создаем блок очков <div className="stars">0</div>
	stars = document.createElement("div");
	//добавляем тегу div => className="stars"
	stars.className = "stars d29";
	stars.innerText = "0";
	
	// Добавляем блок очков в игровое поле <div className="igra1"></div>
	igraPole1.appendChild(stars);
}

/* 
<div className="lifes"> 
	<span></span> 
	<span></span> 
	<span></span> 
</div>
*/
function sozdanieLifes() {
	// создаем блок жизней див <div className="lifes"></div>
	lifes = document.createElement("div");
	//добавляем тегу div => className="lifes"
	lifes.className = "lifes";
	// переменная в которой храним текущее значение отображенных жизней
	var tekucheecolichestvoLifes = 0;
	// пока текущее количество жизней на игровом поле меньше чем мы хотим видеть
	while (tekucheecolichestvoLifes < colichestvoLifes) {
		// создаем тег span
		span = document.createElement("span");
		// помещаем span в блок жизней
		lifes.appendChild(span);
		// увеличиваем количество текущих отображенных жизней на 1
		tekucheecolichestvoLifes = tekucheecolichestvoLifes + 1;
	}
	
	//добавляем блок жизни в игровое поле <div id="igra1"></div>
	igraPole1.appendChild(lifes);
}

/* 
<div id="info-block">
	<h2> Время: <span id=timer>10</span>
</div>
*/
//функция для создания блока таймера
function sozdanieTimerBlock() {
	infoBlock = document.createElement("div");
	infoBlock.id = "info-block";
	// создаем заголовок h2 с текстом "Время: "
	var h2 = document.createElement("h2");
	h2.innerText = "Время: ";
	// в коробочку timerBlock добавляем тег span
	timerBlock = document.createElement("span");
	// прописываем span id = "timer" и текст "100"
	timerBlock.id = "timer";
	timerBlock.innerText = "60";  /*=================================время игры=============*/
	// добавляем в заголовок h2 тег span
	h2.appendChild(timerBlock);
	// добавляем в информационный блок заголовок с таймером
	// infoBlock.appendChild(h2);
	infoBlock.appendChild(h2);
	igraPole1.appendChild(infoBlock);
}

// создаем шарик и добавляем его в игровое поле
// <div id="ball"></div>

function sozdanieBall() {
	// создаем блок div (помещаем в ball, то что мы создали)
	var ball = document.createElement("div");
	// определяем направление, откуда вылетает шарик
	var napravlenie = random(2); // 1 - left, 2 - right
	// если направление 1, то вылетает слева
	if(napravlenie == 1) {
		ball.className = "ball left";
	} else { // иначе, вылетает справа
		ball.className = "ball right";
	}
	// при проведении над шариком
	
	ball.onclick = function() {
		
		// шар с бонусными жизнями
		if (ball.className == "ball life" && colichestvoLifes < 7 && colichestvoLifes > 0) {

			colichestvoLifes = colichestvoLifes + 1;
				
				// удаляем блок жизней
				udalenieLifes();
				// создаем новый блок жизней
				sozdanieLifes();
				// удаляем шарик
				//ball.remove();
		} 

		// шар с отниманием жизней
		if (ball.className == "ball bomb" && colichestvoLifes > 0) {

			colichestvoLifes = colichestvoLifes - 1;
				
				// удаляем блок жизней
				udalenieLifes();
				// создаем новый блок жизней
				sozdanieLifes();
				// удаляем шарик
				//ball.remove();
		} 
		
				if(ball.className != "ball ojidaet-udaleniya"){

			var s = random(3);
			ochki = ochki + s; // 1 при клике на шарик меняется количество очков на s
			// console.log(ochki);
			stars.innerText = ochki; // меняем текст счета, тект из переменной ochki
						
			setTimeout(function(){
				// удаляем шарик
				ball.remove();

				var suchestvuetBall = document.querySelector(".ball"); // element | null
				if(suchestvuetBall == null) {
					//сколько шариков я хочу сделать
					var colichestvoBall = random(3);
					// текущее количество шариков
					var tekucheeColichestvoBall = 0;
					while (tekucheeColichestvoBall < colichestvoBall) {
						// создаем шарик
						sozdanieBall();
						tekucheeColichestvoBall = tekucheeColichestvoBall + 1;
					}
				}

			}, 500); // конец таймера
		}
		ball.className = "ball ojidaet-udaleniya";
	} // конец события onmousemove 

	// случайные координаты
	// Через 200 миллисекунд после создания шарика переместить его в новую позицию
	setTimeout(function() {
		ball.style.top = random(550) + "px";
		ball.style.left = random(1150) + "px";
	}, 200 );
	// Запустить передвижение шарика вниз и удалять его если вышел за границу + отнимать жизнь
	setTimeout(function() {
		// убираем свойство с задержкой изменения стилей
		ball.style.transition = "all 0s";
		// создаем таймер, который каждые 10 миллисекунд опускает шарик ниже
		var timerBall = setInterval(function() {
			// меняем позицию шарика опуская его на 1 пиксель вниз
			ball.style.top = ball.offsetTop + 10 + "px";
			// если шарик вышел за пределы поля
			if(ball.offsetTop > 550) {
				// удаляем шарик
				ball.remove();
				// создаем новый шарик
				sozdanieBall();
				// уменьшаем количество жизней
				colichestvoLifes = colichestvoLifes - 1;
				// если жизней не осталось, то завершить игру
				if(colichestvoLifes == 0) {
					stopIgra();
				}
				// удаляем блок жизней
				udalenieLifes();
				// создаем новый блок жизней
				sozdanieLifes();
				// удаляем (очищаем) таймер
				clearInterval(timerBall);
			}
		}, 50);
	
	}, 5000 );

	if(status != "koniec") {
		//добавляем элемент шарик в игровое поле <div id="igra"></div>
		igraPole.appendChild(ball);
	}

	// Условие появления шаров с дополнительними жизнями 
	
	function bonusLife() {

		if(colichestvoLifes < 7 && colichestvoLifes > 0) {  // начало проверки if(colichestvoLifes < 7)

			var sluchay = random(2);

			if(sluchay == 1) { // начало проверки случая if(sluchay == 1)

				ball.className = "ball life";
				ball.innerText = "+1";
		
				console.dir(ball.className);
						
			} // конец проверки случая if(sluchay == 1)

		} // конец проверки if(colichestvoLifes < 7)

	} // конец bonusLife()

	bonusLife();

	// Условие появления шаров с вычитание жизней
	
	function bonusBomb() {

		if(colichestvoLifes > 1 && colichestvoLifes < 7) {  // начало проверки if(colichestvoLifes < 7)

			var sluchay = random(2);

			if(sluchay == 1) { // начало проверки случая if(sluchay == 1)

				ball.className = "ball bomb";
				ball.innerText = "-1";
		
				console.dir(ball.className);
						
			} // конец проверки случая if(sluchay == 1)

		} // конец проверки if(colichestvoLifes < 7)

	} // конец bonusBomb()

	bonusBomb();

} // конец события sozdanieBall()


/*
<div id="koniec-igra">
	<h5>Ваше время истекло...</h5>
	<h5>Игра окончена!!!</h5>
	<h5>Поторопись в следующий раз!!!</h5>
		<div id="knop1">    
			<button id="knoppr">Еще разок!</button>
		</div>
</div>
*/
/* функция, которая вызывается при окончании времени при не наборе необходимого количества очков */
function sozdanieKoniecIgraTime() {
	// Создаем блок див <div id="koniec-igra"></div>
	koniecIgra = document.createElement("div");
		koniecIgra.id = "koniec-igra";
	// Создаем заголовок <h5>Ваше время истекло...</h5>
	var h2 = document.createElement("h5");
		h2.innerText = "Ваше время истекло...";	
	// Создаем заголовок <h5>Игра окончена!!!</h5>
	var h3 = document.createElement("h5");
		h3.innerText = "Игра окончена!!!";	
	// Создаем заголовок <h5>Поторопись в следующий раз!!!</h5>
	var h4 = document.createElement("h5");
		h4.innerText = "Поторопись в следующий раз!!!";	
	// Добавляем заголовок h2
	koniecIgra.appendChild(h2);
	// Добавляем заголовок h3
	koniecIgra.appendChild(h3);
	// Добавляем заголовок h4
	koniecIgra.appendChild(h4);
	// Создаем блок <div id="knop1"> </div>
	var knop11 = document.createElement("div");
		knop11.id = "knop1";
	// Создаем кнопку <button id="knoppr">Еще разок!!</button>
	knoppr = document.createElement("button");
	knoppr.id = "knoppr";
	knoppr.innerText = "Еще разок!!";
	// Добавляем кнопку <button id="knoppr">Еще разок!!</button> в блок <div id="knop1"> </div>
	knop11.appendChild(knoppr);
	koniecIgra.appendChild(knop11);	
	// Добавляем в игровое поле блок <div id="koniec-igra"></div>
	igraPole.appendChild(koniecIgra);
}
/*
<div id="koniec-igra">
	<h5>Жизней больше нет...</h5>
	<h5>Игра окончена!!!</h5>
	<h5>Поберегись в следующий раз!!!</h5>
		<div id="knop1">    
			<button id="knoppr">Еще разок!</button>
		</div>
</div>
*/
/* функция, которая вызывается при окончании жизней при не наборе необходимого количества очков */
function sozdanieKoniecIgraLife() {
	// Создаем блок див <div id="koniec-igra"></div>
	koniecIgra = document.createElement("div");
		koniecIgra.id = "koniec-igra";
	// Создаем заголовок <h5>Жизней больше нет...</h5>
	var h2 = document.createElement("h5");
		h2.innerText = "Жизней больше нет...";	
	// Создаем заголовок <h5>Игра окончена!!!</h5>
	var h3 = document.createElement("h5");
		h3.innerText = "Игра окончена!!!";
	// Создаем заголовок <h5>Поберегись в следующий раз!!!</h5>
	var h4 = document.createElement("h5");
		h4.innerText = "Поберегись в следующий раз!!!";	
	// Добавляем заголовок h2
	koniecIgra.appendChild(h2);
	// Добавляем заголовок h3
	koniecIgra.appendChild(h3);
	// Добавляем заголовок h4
	koniecIgra.appendChild(h4);
	// Создаем блок <div id="knop1"> </div>
	var knop11 = document.createElement("div");
		knop11.id = "knop1";
	// Создаем кнопку <button id="knoppr">Еще разок!!</button>
	knoppr = document.createElement("button");
	knoppr.id = "knoppr";
	knoppr.innerText = "Еще разок!!";
	// Добавляем кнопку <button id="knoppr">Еще разок!!</button> в блок <div id="knop1"> </div>
	knop11.appendChild(knoppr);
	koniecIgra.appendChild(knop11);	
	// Добавляем в игровое поле блок <div id="koniec-igra"></div>
	igraPole.appendChild(koniecIgra);
}

/*
<div id="koniec-igra">
	<h5>Поздравляю!</h5>
	<h5>Вы набрали: " + ochki + " очков</h5>
	<h5>Так держать!!!</h5>
		<div id="knop1">    
			<button id="knoppr">Усложним!</button>
		</div>
</div>
*/
/*функция, которая вызывается при наборе необходимого количества очков*/
function sozdanieKoniecIgraVin1() {
	// Создаем блок див <div id="koniec-igra"></div>
	koniecIgra = document.createElement("div");
		koniecIgra.id = "koniec-igra";
	// Создаем заголовок <h5>Поздравляю!</h5>
	var h2 = document.createElement("h5");
		h2.innerText = "Поздравляю!";	
	// Создаем заголовок <h5>Вы набрали: " + ochki + " очков"</h5>
	var h3 = document.createElement("h5");
		h3.innerText = "Вы набрали: " + ochki + " очков";
	// Создаем заголовок <h5>Так держать!!!</h5>
	var h4 = document.createElement("h5");
		h4.innerText = "Так держать!!!";	
	// Добавляем заголовок h2
	koniecIgra.appendChild(h2);
	// Добавляем заголовок h3
	koniecIgra.appendChild(h3);
	// Добавляем заголовок h4
	koniecIgra.appendChild(h4);
	// Создаем блок <div id="knop1"> </div>
	var knop11 = document.createElement("div");
		knop11.id = "knop1";
	// Создаем кнопку <button id="knoppr">Усложним!</button>
	knoppr = document.createElement("button");
	knoppr.id = "knoppr";
	knoppr.innerText = "Усложним!";
	// Добавляем кнопку <button id="knoppr">Усложним!</button> в блок <div id="knop1"> </div>
	knop11.appendChild(knoppr);
	koniecIgra.appendChild(knop11);	
	// Добавляем в игровое поле блок <div id="koniec-igra"></div>
	igraPole.appendChild(koniecIgra);
}

/*
<div id="koniec-igra">
	<h5>Поздравляю!</h5>
	<h5>Вы набрали: " + ochki + " очков</h5>
	<h5>ПОБЕДА!!!</h5>
		<div id="knop1">    
			<button id="knoppr">Повторим!</button>
		</div>
</div>
*/
/*функция, которая вызывается при наборе необходимого количества очков*/
function sozdanieKoniecIgraSuperVin() {
	// Создаем блок див <div id="koniec-igra"></div>
	var div = document.createElement("div");
		div.id = "koniec-igra";
	// Создаем заголовок <h5>Поздравляю!</h5>
	var h2 = document.createElement("h5");
		h2.innerText = "Поздравляю!";	
	// Создаем заголовок <h5>Вы набрали: " + ochki + " очков"</h5>
	var h3 = document.createElement("h5");
		h3.innerText = "Вы набрали: " + ochki + " очков";
	// Создаем заголовок <h5>ПОБЕДА!!!</h5>
	var h4 = document.createElement("h5");
		h4.innerText = "ПОБЕДА!!!";	
	// Добавляем заголовок h2
	div.appendChild(h2);
	// Добавляем заголовок h3
	div.appendChild(h3);
	// Добавляем заголовок h4
	div.appendChild(h4);
	// Создаем блок <div id="knop1"> </div>
	var knop11 = document.createElement("div");
		knop11.id = "knop1";
	// Создаем кнопку <button id="knoppr">Повторим!!</button>
	knoppr = document.createElement("button");
	knoppr.id = "knoppr";
	knoppr.innerText = "Повторим!!";
	// Добавляем кнопку <button id="knoppr">Повторим!!</button> в блок <div id="knop1"> </div>
	knop11.appendChild(knoppr);
	div.appendChild(knop11);	
	// Добавляем в игровое поле блок <div id="koniec-igra"></div>
	igraPole.appendChild(div);
}

/*============================
Удаление элементов
============================*/

// Удалять стартовый блок
function udalenieStartBlock() {
	// удалить выбранный блок
	startBlock.remove();
}
// Удалять конец игры блок
function udalenieKoniecIgra() {
	// удалить выбранный блок
koniecIgra.remove();
}

// Удаляем блок жизней
function udalenieStars() {
	stars.remove();
}

// Удаляем блок очков
function udalenieLifes() {
	lifes.remove();
}

// Удаляем таймер
function udalenieTimerBlock() {
	timerBlock.remove();
	infoBlock.remove();
}

// Очистить игровое поле
function ochistitIgraPole() {
	igraPole.innerText = "";
}
// startBlock