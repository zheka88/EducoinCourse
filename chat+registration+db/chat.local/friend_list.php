<?php  
	// include "modules/spisok.php"
	//sql запрос для выбора всех пользователей
	$sql = "SELECT * FROM polzovateli";

	//помещаем результат sql запроса в переменную
	$result = mysqli_query($connect, $sql);

	//получаем количество записей в таблице
	$col_polzovateli = mysqli_num_rows($result);
?>

<?php
	//счетчик цикла
	$i = 0;
	//Перебор массива, пока счетчик не равняется количеству элементов в мвссиве
	while($i < $col_polzovateli){
		//сохраняем в переменную данные пользователя
		$polzovatel = mysqli_fetch_assoc($result);
		//если пользователь авторизирован - continue
		if (isset($_COOKIE["polzovatel_id"])) {
			if ($polzovatel["id"] == $_COOKIE["polzovatel_id"]) {
				$i++;
				continue;}
			}
		echo "<li>";
			echo "<a href='/index.php?user=" . $polzovatel["id"] . "'>";
				if($polzovatel["photo"]) {
					echo "<div class=\"avatar\">
					<img src='" . $polzovatel["photo"] . "' >
					</div>";
				}	
			echo "<h2>" . $polzovatel["name"] . "</h2>";
			// echo "<p>" . $polzovatel["message"] . "</p>";
			// echo "<div class=\"time\">09:12</div>";
			if ($polzovatel["phone"]) {
				echo "<span>" . $polzovatel["phone"] . "</span>";
			}
			echo "</a>";
		echo "</li>";
			//Проверяем является контакт другом или нет
			$sql_friends = "SELECT * FROM friends WHERE user_1 = '" . $polzovatel["id"] . "'" .
										" AND user_2 = '" . $_COOKIE["polzovatel_id"] . "'" .
										" OR user_1 = " . $_COOKIE["polzovatel_id"] . 
										" AND user_2 =" . $polzovatel["id"];
			$result_friends = mysqli_query($connect, $sql_friends);
			$friend = mysqli_num_rows($result_friends);
			//если друг - выводим Удалить из друзей
			if ($friend > 0) {
				?>
				<div data-ssylka='delete_friend.php?user_id=<?php echo $polzovatel["id"]; ?>' onclick="add(this)">Удалить из друзей</div>
				<?php
			} else {
				//если не друг - добавить в друзья
				?>
				<div data-ssylka="http://chat.local/add_friend.php?user_id=<?php echo $polzovatel["id"]; ?>" onclick="add(this)">Добавить в друзья</div>
				<?php
			}
	//инкрементирование счётчика
	$i++;
	}
?>