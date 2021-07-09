<?php  
//удаление из друзей
include "configs/db.php";
include "configs/nastroiki.php";

if(isset($_GET['user_id'])) {
	$sql = "DELETE FROM friends WHERE user_1 = " . $polzovatel_id . " AND user_2 = " . $_GET["user_id"] . 
	" OR user_1 = " . $_GET["user_id"] . " AND user_2 = " . $polzovatel_id;
	if(mysqli_query($connect, $sql)) {
		include "friend_list.php";
	}
}


?>