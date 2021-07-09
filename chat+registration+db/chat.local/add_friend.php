<?php 
//добавление в друзья
include "configs/db.php";
include "configs/nastroiki.php";


/*
1. Создать таблицу друзей - готово
2. Сделать ссылку на добавление в друзья - готово
3. Создать страницу обработчик, где добавляем в БД выбранного пользователя
4. Перенаправляем пользователя на главную страницу
*/

if (isset($_GET['user_id'])) {
	$sql = "INSERT INTO friends (user_1, user_2) VALUES ('" . $polzovatel_id . "', '" . $_GET['user_id'] . "')";
	if(mysqli_query($connect, $sql)) {
		include "friend_list.php";
	}
}



?>
