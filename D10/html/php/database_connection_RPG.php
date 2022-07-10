<?php

$db_host = getenv('MYSQL_HOST', true) ?: getenv('MYSQL_HOST');
$db_name = getenv('MYSQL_DATABASE', true) ?: getenv('MYSQL_DATABASE');
$db_user = getenv('MYSQL_USER', true) ?: getenv('MYSQL_USER');
$db_pwd  = getenv('MYSQL_PASSWORD', true) ?: getenv('MYSQL_PASSWORD');
$db_port = getenv('MYSQL_PORT', true) ?: getenv('MYSQL_PORT');

function general_rpg($db_port,$db_host,$db_name,$db_user,$db_pwd){

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
	                "title" => $data['title'],            
	                "picture" => $data['picture'],

	                );
	        }
	$ask->closecursor();
	echo json_encode($list);

}

function more_information_rpg($id,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->prepare("SELECT * from rpg where id = ?");
		$ask->execute(array($id));



	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "title" => $data['title'],
	                "rule_book" => $data['rule_book'],
	                "description" => $data['description'],                
	                "picture" => $data['picture'],

	                );
	        }
	$ask->closecursor();
	echo json_encode($list);

}



if(isset($_POST['key5'])) {

	general_rpg($db_port,$db_host,$db_name,$db_user,$db_pwd);
}




elseif (isset($_POST['id_RPG'])) {
	
	more_information_rpg($_POST['id_RPG'],$db_port,$db_host,$db_name,$db_user,$db_pwd);

}