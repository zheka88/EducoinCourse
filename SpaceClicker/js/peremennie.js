// ball - шарик на игровом поле
var ball = null;

// stars - очки на игровом поле
var stars = null;

// lifes - жизни на игровом поле
var lifes = null;

// количество жизней
var colichestvoLifes = 7;

// ochki = счет игры
var ochki = 0;

var status = "open";

var metka;

var metka1 = 7;


// помещаем в переменную старт блок
var startBlock = null;
var koniecIgra = null;
// помещаем в переменную кнопку старт 
var startKnopka = null;

// var startKnop = null;

// выбираем блок таймера в html
// <span id=timer>10</span>
var timerBlock = null;

// помещаем в переменную кнопку управления перезапуском игры
var knop = document.querySelector("#knop");
// кнопка Начать заново, ЖМИ
var knopb = document.querySelector("#knopb");

// помещаем в переменную кнопку управления перезапуском игры
// var knop1 = document.querySelector("#knop1");

// кнопка Начать заново при проиграше
var knoppr = document.querySelector("#knoppr");

// игровое поле
var igraPole = document.querySelector("#igra");

// очки ниже игровое поле
var igraPole1 = document.querySelector("#igra1");

// выбираем информационный блок
var infoBlock = document.querySelector("#info-block");


var bd = document.querySelector("#bd");


//knopb    knoppr