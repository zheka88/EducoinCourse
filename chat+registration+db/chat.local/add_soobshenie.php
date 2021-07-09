<?php  
include 'configs/db.php';
?>
<?php  
	//добавление сообщения в базу данных
	if (isset($_POST["otpravka_sms"])) {
		$sql = "INSERT INTO soobsheniya (kto_user_id, komu_user_id, text) VALUES ('" . $_POST["kto_user_id"] . "', '" . $_POST["komu_user_id"] . "', '" . $_POST["text"] . "')";
		if (mysqli_query($connect, $sql)){
			$otpravlenno_polzovatel_id = $_POST["komu_user_id"];
			include "modules/spisok-soobsheniy.php";
		} else {
			echo "<h2>Ошибка отправки</h2>";
		}
	}

?>
