//тест jQuery
$('#spisok-soobsheniy').append('<a href="#">jQuery This is the text in new element.<p>');

//пролистываем до конца список сообщений
var spisok_sms = document.querySelector("#spisok-soobsheniy");
	spisok_sms.scrollTop = 9999;
		
//Открыть модальное окно входа
var btnOpenLogin = document.querySelector("#open_login");
	btnOpenLogin.onclick = function(){
		//если мы не авторизированны - выводим окно входа
		if (!$.cookie('polzovatel_id')) {
		var loginModal = document.querySelector("#login-modal");
			loginModal.style.display = "block";
		} else {
		// иначе: делаем выход из системы(удаляем куки)
			$.removeCookie('polzovatel_id');
			$(location).attr('href', '/');
		}
	}
//Закрыть модальное окно входа
var btnCloseLogin = document.querySelector("#login-modal .close");
	btnCloseLogin.onclick = function(){
		var loginModal = document.querySelector("#login-modal");
			loginModal.style.display = "none";
	}
//Открыть модальное окно контактов
var btnOpenContact = document.querySelector("#open_contact");
	btnOpenContact.onclick = function(){
	var contactsModal = document.querySelector("#contacts-modal");
		contactsModal.style.display = "block";
	}
//Закрыть модальное окно контактов
var contactsModalCloseBtn = document.querySelector("#contacts-modal .close");
	contactsModalCloseBtn.onclick = function(){
		var contactsModal = document.querySelector("#contacts-modal");
			contactsModal.style.display = "none";
	}

//анимированное появление меню
var shapkaMenu = document.querySelector("#menu");
var shapkaMenuTop = shapkaMenu.offsetTop;	
function topTo15px() {
	if (shapkaMenuTop > 15) {
		--shapkaMenuTop;
		shapkaMenu.style.top = shapkaMenuTop + "px";
	}
}
var timer = setInterval(topTo15px, 20);

//Добавление/Удаление друзей через ajax
function add(element) {
	var friend_list = document.querySelector("#friend_list");
	var ssylka = element.dataset.ssylka;

	var ajax = new XMLHttpRequest();
		ajax.open("GET", ssylka, false);
		ajax.send();
		console.dir(ajax);
		friend_list.innerHTML = ajax.response;
}

//Отправка сообщений через ajax
var form = document.querySelector("#form");
form.onsubmit = function(sobitie){
	sobitie.preventDefault();
	var komu = form.querySelector("input[name='komu_user_id']");
	var ot = form.querySelector("input[name='kto_user_id']");
	var text = form.querySelector("textarea");

	var dannie = "otpravka_sms=1" +
				 "&komu_user_id=" + komu.value +
				 "&kto_user_id=" + ot.value +
				 "&text=" + text.value;

	var ajax = new XMLHttpRequest();
		ajax.open("POST", form.action, false);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		ajax.send(dannie);

	    spisok_sms = document.querySelector("#spisok-soobsheniy");
		spisok_sms.innerHTML = ajax.response;
		//пролистываем список вниз при появлении нового сообщения
		spisok_sms.scrollTop = 9999;
		//очищаем форму после отправки 
		form.reset();
}

//поиск пользователей через ajax
var poisk = document.querySelector("#poisk");
poisk.onsubmit = function(sobitie) {
	sobitie.preventDefault();
	var text = poisk.querySelector("input[name='poisk-text']");

	var ajax = new XMLHttpRequest();
		ajax.open("GET", poisk.action + text.value, false);
		ajax.send();
		console.dir(ajax);
	var spisok = document.querySelector("#spisok");
		spisok.innerHTML = ajax.response;
}