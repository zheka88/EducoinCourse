<?php  
include "configs/db.php";

//если существует запрос с поисковым текстом ИИ текст поиска равен имени пользователя
if (isset($_GET["poisk-text"])) {
	$sql = "SELECT * FROM `polzovateli` WHERE `name` LIKE '%" . $_GET["poisk-text"] . "%' ORDER BY `id` ASC";

	$poisk_result = mysqli_query($connect, $sql);

	$col_zapisey = mysqli_num_rows($poisk_result);
	//если есть результаты поиска
	if ($col_zapisey > 0 ) {

		//счётчик цикла
		$i = 0;
		while ($i < $col_zapisey) {
			$polzovatel = mysqli_fetch_assoc($poisk_result);
			echo "<ul>";
				echo "<li>";
					echo "<a href='/index.php?user=" . $polzovatel["id"] . "'>";
						if($polzovatel["photo"] != "") {
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
			echo "</ul>";
		$i++;
		}
	}else {
	/*если нет результатов поиска*/
	/*выводим список пользователей*/
		include "modules/spisok.php";
	}
}
?>