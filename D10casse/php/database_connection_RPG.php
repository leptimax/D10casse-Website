<?php

function general_rpg(){

	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->query("SELECT * from RPG");



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

function more_information_rpg($id){

	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	

	$ask = $bdd->prepare("SELECT * from RPG where id = ?");
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

	general_rpg();
}




elseif (isset($_POST['id_RPG'])) {
	
	more_information_rpg($_POST['id_RPG']);

}