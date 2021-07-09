<?php 
//если существует параметр "user"
if(isset($_GET["user"]) || isset($otpravlenno_polzovatel_id)){
	$id = null;
	if (isset($_GET["user"])){
		$id = $_GET["user"];
	} else {
		$id = $otpravlenno_polzovatel_id;
	}

	//sql запрос для выбора всех сообщений
	$sql = "SELECT * FROM soobsheniya " .
		"WHERE (komu_user_id=" . $id . //
		" AND kto_user_id=" . $_COOKIE["polzovatel_id"] . ")" .
		" OR (komu_user_id=" . $_COOKIE["polzovatel_id"] . " AND kto_user_id=" . $id . ")";

	//помещаем результат sql запроса в переменную
	$result = mysqli_query($connect, $sql);

	//получаем количество записей в таблице
	$col_soobsheniy = mysqli_num_rows($result);

	//sql запрос для выбора $_GET[user] пользователя по id из db
	$sql_2 = "SELECT * FROM polzovateli WHERE id = '$id'";

	//помещаем результат sql запроса в переменную
	$result_2 = mysqli_query($connect, $sql_2);

	//получаем массив данных пользователя из db
	$current_polzovatel = mysqli_fetch_assoc($result_2);

	//sql запрос для выбора авторизованного пользователя по id из db
	$sql_3 = "SELECT * FROM polzovateli WHERE id = '" . $_COOKIE["polzovatel_id"] . "'";
	$result_3 = mysqli_query($connect, $sql_3);
	$autorised_polzovatel = mysqli_fetch_assoc($result_3);

	//счетчик цикла
	$i = 0;
	while ($i < $col_soobsheniy) {
				?>
					<?php 
						//получаем массив сообщений выбранного пользователя
						$sms_polzovatel = mysqli_fetch_assoc($result);
			//если сообщение от авторизованного пользователя - выводим слева
			if($sms_polzovatel["kto_user_id"] == $_COOKIE["polzovatel_id"]){
					?>
				<ul>
					<li>
						<div class="avatar"><img src="<?php echo $autorised_polzovatel["photo"] ?>">
						</div>
						<h2><?php echo $autorised_polzovatel["name"] ?></h2>
						<p><?php echo $sms_polzovatel["text"] ?></p>
						<div><?php echo $sms_polzovatel["time"] ?></div>
					</li>
				</ul>
				<?php
			//если сообщение не от авторизованного пользователя - выводим справа
			} else {
				?>
				<ul style="margin-left: 71%;">
					<li>
						<div class="avatar"><img src="<?php echo $current_polzovatel["photo"] ?>">
						</div>
						<h2><?php echo $current_polzovatel["name"] ?></h2>
						<p><?php echo $sms_polzovatel["text"] ?></p>
						<div><?php echo $sms_polzovatel["time"] ?></div>
					</li>
				</ul>
				<?php
			}
		$i++;
	}
}
?>