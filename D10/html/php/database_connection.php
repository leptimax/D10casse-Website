<?php

$db_host = getenv('MYSQL_HOST', true) ?: getenv('MYSQL_HOST');
$db_name = getenv('MYSQL_DATABASE', true) ?: getenv('MYSQL_DATABASE');
$db_user = getenv('MYSQL_USER', true) ?: getenv('MYSQL_USER');
$db_pwd  = getenv('MYSQL_PASSWORD', true) ?: getenv('MYSQL_PASSWORD');
$db_port = getenv('MYSQL_PORT', true) ?: getenv('MYSQL_PORT');

/*Fonction permettant de remplir l'affichage général de la page des jeux de société*/
function general_boardgame($db_port,$db_host,$db_name,$db_user,$db_pwd)
{
	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->query("SELECT * from board_games");



	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['name'],
	                "nb_players" => $data['nb_players'],
	                "description" => $data['description'],                
	                "picture" => $data['picture'],

	                );
	        }
	$ask->closecursor();
	echo json_encode($list);

}

/*fonction permettant de récupérer les informations spécifique au jeu sélectionné*/

function more_information_boardgame($id,$db_port,$db_host,$db_name,$db_user,$db_pwd){


	try
		{
			$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
		}
		catch (Exception $e)
		{
			die('Erreur : ' . $e->getMessage());
		}

		$ask = $bdd->prepare("SELECT * from board_games where id = ?");
		$ask->execute(array($id));

		while($data = $ask->fetch())
		        {
		            $list[] = array(
		                "id" => $data['id'], 
		                "name" => $data['name'],
		                "description" => $data['description'],                
		                "picture" => $data['picture'],
		                "nb_players" => $data['nb_players'],
						"rule" => $data['rule'],
						"link" => $data['link'],
						"complete_description" => $data['complete_description'],
						"location" => $data['location']

		                );
		        }
		$ask->closecursor();
		echo json_encode($list);


}







function getGameByTitle($mot,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->prepare("SELECT * from board_games where UCASE(name) LIKE ?");
	$ask->execute(array($mot));


	$verif = null;
	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['name'],
	                "nb_players" => $data['nb_players'],
	                "description" => $data['description'],                
	                "picture" => $data['picture'],

	                );
	            $verif = "good";
	        }
	$ask->closecursor();
	if($verif == null){
		echo json_encode("none");
	}
	else
		echo json_encode($list);
	

}

function sort_name_player($title,$player,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->prepare("SELECT * from board_games where UCASE(name) LIKE ? AND nb_players_max >= ?");
	$ask->execute(array($title,$player));

	$verif = null;

	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['name'],
	                "nb_players" => $data['nb_players'],
	                "description" => $data['description'],                
	                "picture" => $data['picture'],

	                );
	            $verif = "good";
	        }
	$ask->closecursor();

	if($verif == null){
		echo json_encode("none");
	}
	else{
		echo json_encode($list);
	}
	

}

function sort_name_location($title,$location,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	
	$ask = $bdd->prepare("SELECT * from board_games where UCASE(name) LIKE ? AND UCASE(location) LIKE ?");
	
	$ask->execute(array($title,$location));


	$verif = null;
	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['name'],
	                "nb_players" => $data['nb_players'],
	                "description" => $data['description'],                
	                "picture" => $data['picture'],

	                );
	            $verif = "good";
	        }
	$ask->closecursor();

	if($verif == null){
		echo json_encode("none");
	}
	else
	{
		echo json_encode($list);
	}
	
}

function global_sort($title,$player,$location,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}


	$ask = $bdd->prepare("SELECT * from board_games where UCASE(name) LIKE ? AND nb_players_max >= ? AND UCASE(location) LIKE ?");
	$ask->execute(array($title,$player,$location));

	$verif = null;
	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['name'],
	                "nb_players" => $data['nb_players'],
	                "description" => $data['description'],                
	                "picture" => $data['picture'],

	                );
	            $verif = "good";
	        }
	$ask->closecursor();

	if($verif == null){
		echo json_encode("none");
	}
	else{
		echo json_encode($list);
	}

}



/*partie switch */

if(isset($_POST['key1'])){

	general_boardgame($db_port,$db_host,$db_name,$db_user,$db_pwd);
}



elseif (isset($_POST['id_boardgame'])) {

	more_information_boardgame($_POST['id_boardgame'],$db_port,$db_host,$db_name,$db_user,$db_pwd);

}


elseif (isset($_POST['title']) and isset($_POST['key1'])) {

	getGameByTitle($_POST['title'],$db_port,$db_host,$db_name,$db_user,$db_pwd);

}



elseif (isset($_POST['title']) and isset($_POST['player']) and isset($_POST['key2'])) {

	$title = $_POST['title'];
	$title .= '%';
	sort_name_player($title,$_POST['player'],$db_port,$db_host,$db_name,$db_user,$db_pwd);

	# code...
}




elseif (isset($_POST['title']) and isset($_POST['location']) and isset($_POST['key3'])) {

	$title = $_POST['title'];
	$title .= '%';
	sort_name_location($title,$_POST['location'],$db_port,$db_host,$db_name,$db_user,$db_pwd);

}



elseif (isset($_POST['title']) and isset($_POST['player']) and isset($_POST['location']) ) {
	$title = $_POST['title'];
	$title .= '%';
	global_sort($title,$_POST['player'],$_POST['location'],$db_port,$db_host,$db_name,$db_user,$db_pwd);

}