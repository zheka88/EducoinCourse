<?php  
//данные для подключения к базе данных
$server = "localhost";
$username = "Jeka";
$password = "123";
$dbname = "chat";

//подключение к базе данных
$connect = mysqli_connect($server, $username, $password, $dbname);

//устанавливаем кодировку пользователя
mysqli_set_charset($connect, 'utf8');
?>