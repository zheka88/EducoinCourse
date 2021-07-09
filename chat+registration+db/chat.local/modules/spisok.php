<?php  
//sql запрос для выбора всех пользователей
$sql = "SELECT * FROM polzovateli";

//помещаем результат sql запроса в переменную
$result = mysqli_query($connect, $sql);

//получаем количество записей в таблице
$col_polzovateli = mysqli_num_rows($result);

?>

<ul>

<?php  
	/*выводим список пользователей*/

	//счетчик цикла
	$i = 0;
	//Перебор массива, пока счетчик не равняется количеству элементов в мвссиве
	while($i < $col_polzovateli){
		//сохраняем в переменную данные пользователя
		$polzovatel = mysqli_fetch_assoc($result);
		//если пользователь авторизирован - continue
		if (isset($_COOKIE["polzovatel_id"])) {
			if ($polzovatel["id"] == $_COOKIE["polzovatel_id"]) {continue;}
			}
		echo "<li>";
			echo "<a href='/index.php?user=" . $polzovatel["id"] . "'>";
				if($polzovatel["photo"]) {
					echo "<div class=\"avatar\">
					<img src='" . $polzovatel["photo"] . "'>
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
	//инкрементирование счётчика
	$i++;
	}
?>
</ul>