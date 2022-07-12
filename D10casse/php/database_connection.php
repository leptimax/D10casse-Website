<?php

/*Fonction permettant de remplir l'affichage général de la page des jeux de société*/
function general_boardgame()
{
	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
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

function more_information_boardgame($id){


	try
		{
		$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
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







function getGameByTitle($mot){

	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
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

function sort_name_player($title,$player){

	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
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

function sort_name_location($title,$location){

	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
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

function global_sort($title,$player,$location){

	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
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

	general_boardgame();
}



elseif (isset($_POST['id_boardgame'])) {

	more_information_boardgame($_POST['id_boardgame']);

}


elseif (isset($_POST['title']) and isset($_POST['key1'])) {

	getGameByTitle($_POST['title']);

}



elseif (isset($_POST['title']) and isset($_POST['player']) and isset($_POST['key2'])) {

	$title = $_POST['title'];
	$title .= '%';
	sort_name_player($title,$_POST['player']);

	# code...
}




elseif (isset($_POST['title']) and isset($_POST['location']) and isset($_POST['key3'])) {

	$title = $_POST['title'];
	$title .= '%';
	sort_name_location($title,$_POST['location']);

}



elseif (isset($_POST['title']) and isset($_POST['player']) and isset($_POST['location']) ) {
	$title = $_POST['title'];
	$title .= '%';
	global_sort($title,$_POST['player'],$_POST['location']);

}