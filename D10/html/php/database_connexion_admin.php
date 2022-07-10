<?php

$db_host = getenv('MYSQL_HOST', true) ?: getenv('MYSQL_HOST');
$db_name = getenv('MYSQL_DATABASE', true) ?: getenv('MYSQL_DATABASE');
$db_user = getenv('MYSQL_USER', true) ?: getenv('MYSQL_USER');
$db_pwd  = getenv('MYSQL_PASSWORD', true) ?: getenv('MYSQL_PASSWORD');
$db_port = getenv('MYSQL_PORT', true) ?: getenv('MYSQL_PORT');

if(isset($_POST['ID']) and isset($_POST['password'])){

    $bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);

    $verif = $bdd->query("SELECT username,password from admin");

    while($donnee = $verif->fetch()){
        
        if($donnee['username'] == $_POST['ID'] and $donnee['password'] == $_POST['password']){
            include("../admin.html");
            exit();
        }
    }
    include("../php/page_connexion.php");
    echo('<h4 style="text-align : center; position: absolute; left: 50%; top: 67%;transform: translate(-50%, -50%);">nom d\'tilisateur ou mot de passe incorrect</h4>');
}



function fill_up_list_game($db_port,$db_host,$db_name,$db_user,$db_pwd){

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

	                );
	        }
	$ask->closecursor();
	echo json_encode($list);



}

function fill_up_attribute($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->prepare("SELECT * from board_games where id = ?");
	$ask->execute(array($element));



	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['name'],
	                "nb_players" => $data['nb_players'],
	                "description" => $data['description'],
	                "rule" => $data['rule'],
	                "link" =>$data['link'],
	                "picture" => $data['picture'],
	                "complete_description" => $data['complete_description'],
	                "location" => $data['location'],
	                "nb_players_min" => $data['nb_players_min'],
	                "nb_players_max" => $data['nb_players_max'],



	                );
	        }
	$ask->closecursor();
	echo json_encode($list);



}

function update_attribute_game($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){


	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("UPDATE board_games SET name= ?,description=?,rule=?,link=?,picture=?,complete_description=?,location=?,nb_players= ? ,nb_players_min=?,nb_players_max =? WHERE id = ?");

	$ask->execute(array($element[0],$element[1], $element[2],$element[3],$element[4],$element[5],$element[6],$element[7],$element[8],$element[9],$element[10]));

	$ask->closecursor();
	echo json_encode("good");

}


function delete_boardgame($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("DELETE FROM board_games where id = ?");
	$ask->execute(array($element));

	echo json_encode("good");
}

function create_boardgame($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){


	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("INSERT INTO board_games (name,description,rule,link,picture,complete_description,location,nb_players,nb_players_min,nb_players_max) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");

	$ask->execute(array($element[0],$element[1], $element[2],$element[3],$element[4],$element[5],$element[6],$element[7],$element[8],$element[9]));

	$ask->closecursor();
	echo json_encode("good");



}











function fill_up_list_RPG($db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->query("SELECT * from rpg");



	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['title'],

	                );
	        }
	$ask->closecursor();
	echo json_encode($list);



}


function fill_up_attribute_RPG($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->prepare("SELECT * from rpg where id = ?");
	$ask->execute(array($element));



	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['title'],
	                "description" => $data['description'],
	                "rulebook" => $data['rule_book'],
	                "picture" => $data['picture'],



	                );
	        }
	$ask->closecursor();
	echo json_encode($list);



}


function update_attribute_RPG($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){


	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("UPDATE rpg SET title= ?,description=?,rule_book=?,picture=? WHERE id = ?");

	$ask->execute(array($element[0],$element[1], $element[2],$element[3],$element[4]));

	$ask->closecursor();
	echo json_encode($element);

}


function delete_RPG($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("DELETE FROM rpg where id = ?");
	$ask->execute(array($element));

	echo json_encode("good");
}

function create_RPG($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){


	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}


	$ask = $bdd->prepare("INSERT INTO rpg (title,description,rule_book,picture) VALUES (?, ?, ?, ?);");

	$ask->execute(array($element[0],$element[1], $element[2],$element[3]));

	$ask->closecursor();
	echo json_encode($element);



}











function fill_up_list_event($date_min,$date_max,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	$ask->execute(array($date_min,$date_max));


	$verif = null;
	while($data = $ask->fetch())
    {
        $list[] = array(
            "id" => $data['id'], 
            "name" => $data['title'],

            );
        $verif = "good";
    }


	$ask->closecursor();


	if($verif == null){
    	echo json_encode($verif);	
    }
    else{
		echo json_encode($list);
	}


}

function fill_up_attribute_event($id,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->prepare("SELECT * from event where id = ?");
	$ask->execute(array($id));



	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['title'],
	                "description" => $data['description'],
	                "date_event" => $data['date_event'],
	                "picture" => $data['picture'],



	                );
	        }
	$ask->closecursor();
	echo json_encode($list);

}

function update_attribute_event($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){


	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("UPDATE event SET title= ?,description=?,date_event=?,picture=? WHERE id = ?");

	$ask->execute(array($element[0],$element[1], $element[2],$element[3],$element[4]));

	$ask->closecursor();
	echo json_encode("good");


}


function delete_event($element,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("DELETE FROM event where id = ?");
	$ask->execute(array($element));

	echo json_encode("good");
}

function create_event($element){


	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}


	$ask = $bdd->prepare("INSERT INTO event (title,description,date_event,picture) VALUES (?, ?, ?, ?);");

	$ask->execute(array($element[0],$element[1], $element[2],$element[3]));

	$ask->closecursor();
	echo json_encode($element);



}


if(isset($_POST['fill_up_game'])){
	fill_up_list_game($db_port,$db_host,$db_name,$db_user,$db_pwd);
}
elseif (isset($_POST['fill_up_attribute'])) {
	fill_up_attribute($_POST['fill_up_attribute'],$db_port,$db_host,$db_name,$db_user,$db_pwd);
}
elseif (isset($_POST['update_attribute_game'])) {
	$data = $_POST['update_attribute_game'];

	update_attribute_game($data,$db_port,$db_host,$db_name,$db_user,$db_pwd);
}
elseif (isset($_POST['delete_attribute_boardgame'])) {

	$data = $_POST['delete_attribute_boardgame'];
	delete_boardgame($data,$db_port,$db_host,$db_name,$db_user,$db_pwd);
}
elseif(isset($_POST['create_game'])){

	$data = $_POST['create_game'];
	create_boardgame($data,$db_port,$db_host,$db_name,$db_user,$db_pwd);
}



elseif (isset($_POST['fill_up_RPG'])) {
	fill_up_list_RPG($db_port,$db_host,$db_name,$db_user,$db_pwd);
}

elseif (isset($_POST['fill_up_attribute_RPG'])) {
	fill_up_attribute_RPG($_POST['fill_up_attribute_RPG'],$db_port,$db_host,$db_name,$db_user,$db_pwd);
}

elseif (isset($_POST['update_attribute_RPG'])) {
	$data = $_POST['update_attribute_RPG'];
	update_attribute_RPG($data,$db_port,$db_host,$db_name,$db_user,$db_pwd);
}

elseif (isset($_POST['delete_attribute_RPG'])) {
	$data = $_POST['delete_attribute_RPG'];
	delete_RPG($data,$db_port,$db_host,$db_name,$db_user,$db_pwd);
}
elseif (isset($_POST['create_RPG'])) {
	$data = $_POST['create_RPG'];
	create_RPG($data,$db_port,$db_host,$db_name,$db_user,$db_pwd);
	# code...
}




elseif (isset($_POST['fill_up_event_min']) and isset($_POST['fill_up_event_max'])) {
	fill_up_list_event($_POST['fill_up_event_min'],$_POST['fill_up_event_max'],$db_port,$db_host,$db_name,$db_user,$db_pwd);
}
elseif (isset($_POST['fill_up_attribute_event'])) {
	fill_up_attribute_event($_POST['fill_up_attribute_event'],$db_port,$db_host,$db_name,$db_user,$db_pwd);
	
}
elseif (isset($_POST['update_attribute_event'])) {
	update_attribute_event($_POST['update_attribute_event'],$db_port,$db_host,$db_name,$db_user,$db_pwd);
}
elseif (isset($_POST['delete_attribute_event'])) {
	delete_event($_POST['delete_attribute_event'],$db_port,$db_host,$db_name,$db_user,$db_pwd);
}
elseif (isset($_POST['create_event'])) {
	create_event($_POST['create_event'],$db_port,$db_host,$db_name,$db_user,$db_pwd);
}