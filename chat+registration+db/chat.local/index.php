<?php  
include "configs/db.php";
include "configs/nastroiki.php";
?>
<?php  
				//авторизация
				if(
					isset($_POST["email"]) && isset($_POST["password"])
					&& $_POST["email"] != "" && $_POST["password"] != "") {
							
						$sql = "SELECT * FROM `polzovateli` WHERE `email` LIKE '" . $_POST["email"] . "' AND `password` LIKE '" . $_POST["password"] . "'";
						$result = mysqli_query($connect, $sql);
						$col_polzovateley = mysqli_num_rows($result);

						if ($col_polzovateley == 1) {
							$sys_polzovatel = mysqli_fetch_assoc($result);
							//создаём куки длительностью 2 часа
							setcookie("polzovatel_id", $sys_polzovatel["id"], time() + 60 * 60 * 2);
							// "<script>cookieExist = true;</script>";
							header("Location: /");

						}



					}
					?>
<!DOCTYPE html>
<html style="height: 100%;">
	<head>
		<title><?php echo $zagolovokSite; ?></title>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		

		<!--
			
		-->

		<?php  
		// echo "<p>" . var_dump($_COOKIE) ."</p>";
		// echo "<p>" . var_dump($_COOKIE) ."</p>";
		// echo "<p>" . var_dump($_COOKIE) ."</p>";
		// echo "<p>" . var_dump($_COOKIE) ."</p>";
		// echo "<p>" . var_dump($_COOKIE) ."</p>";
		// echo "<p>" . var_dump($_COOKIE) ."</p>";

			//подключаем файл с пользователями
		?>

		<div id="shapka">

			<div id="logo">
				<img src="images/logo.jpg"> <span><i>web</i><b>ЧАТ!</b></span>
			</div>

			<div id="menu">

				<a href="#" id="open_contact">Контакты</a>
				<a href="#">Настройки</a>
				<?php
				if (isset($_COOKIE["polzovatel_id"])) {
				?>
					<a href="#" id="open_login">
					<?php 
					echo "Выйти";
				} else { ?>
					<a href="#" id="open_login"><?php 
					echo "Войти";
				}
					?>
					</a>

			</div>

		</div>

		<div id="content">
			<div id="users">
				<form action="http://chat.local/search_user.php?poisk-text=" method="GET" id="poisk">
					<input type="text" name="poisk-text">
					<button type="submit">
						<img src="images/poisk.png">
					</button>
				</form>
				<div id="spisok">
				<!-- Список контактов -->
				<!-- подключаем файл со списком контактов -->
					<?php include "modules/spisok.php"; ?>
				<!--                                      -->
				</div>
			</div>
			<div id="soobsheniya">
				<div id="spisok-soobsheniy" onload="scrollTop()">
				<!-- подключаем файл со списком сообщений -->
					<?php 
					//подключаем массив сообщений
					include "modules/spisok-soobsheniy.php";
					include "add_soobshenie.php";
					 ?>
				<!--                                      -->
				</div>
				<form id="form" action="http://chat.local/add_soobshenie.php" method="POST">
					<input type="hidden" name="komu_user_id" value="<?php echo $_GET["user"]; ?>">
					<input type="hidden" name="kto_user_id" value="<?php echo $_COOKIE["polzovatel_id"]; ?>">
					<textarea name="text"></textarea>
					<button type="submit" name="otpravka_sms">
						<img src="images/send.png">
					</button>
				</form>
			</div>
			


		</div>

		<div class="modal" id="contacts-modal">
			<div class="close">X</div>
			
			<div class="content">
					
				<ul id="friend_list">
					<?php include "friend_list.php" ?>
				</ul>
			</div>
		</div>
		<?php  
		/*
		*********************
			Регистрация
		*********************
		1. Дизайн/мокап - готов
		2. Сделать отправку формы
			Обработчик:
		3. Проверить есть ли пользователь с таким e-mail
		4. Заполнил ли пользователь поля формы (e-mail, password)
		5. Если все предыдущие(3 и 4) шаги прошли, то
			5.1 Добавить пользователя в базу данных

		*/
		?>
		<div class="modal" id="login-modal">
			<div class="close">X</div>

			<div class="content">
				<form action="index.php" method="POST">
					<p>
						<h2>e-mail</h2>
						<input type="text" name="email">
					</p>
					<p>
						<h2>password</h2>
						<input type="password" name="password">
					</p>
					<button type="submit">Войти</button>
					<!-- <button type="submit">Регистрация</button> -->
				</form>
			</div>
		</div>

				

				<?php

				//регистрация
				// if(
				// 	isset($_POST["email"]) && isset($_POST["password"])
				// 	&& $_POST["email"] != "" && $_POST["password"] != "") {
				// 	//добавляем в таблицу нового пользователя
				// 	$sql = "INSERT INTO polzovateli (email, password) VALUES ('" . $_POST["email"] . "', '" . $_POST["password"] . "')";
				// 		if(mysqli_query($connect, $sql)) {
				// 			echo "h2>Пользователь добавлен/h2>";
				// 		} else {
				// 			echo "h2>Произошла ошибка/h2>";
				// 		}
				// }

				?>
		<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
		<script type="text/javascript" src="jquery.cookie.js"></script>
		<script src="script.js"></script>
	</body>
</html>