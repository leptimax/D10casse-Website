<?php 

function future_event($time){

	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("SELECT * from event where date_event >= ?");
	$ask->execute(array($time));

	$data = $ask->fetch();
	if($data == false){
		$ask->closecursor();
		echo json_encode("error");
		
	}
	else{
		while($data)
		        {
		            $list[] = array(
		                "id" => $data['id'], 
		                "name" => $data['title'],
		                "description" => $data['description'],                
		                "picture" => $data['picture'],
		                "date" => $data['date_event']

		                );
		            $data = $ask->fetch();
		        }
		$ask->closecursor();
		echo json_encode($list);
	}

}

function passed_event($time){

	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

	$ask = $bdd->prepare("SELECT * from event where date_event < ?");
	$ask->execute(array($time));

	while($data = $ask->fetch())
	        {
	            $list[] = array(
	                "id" => $data['id'], 
	                "name" => $data['title'],
	                "description" => $data['description'],                
	                "picture" => $data['picture'],
	                "date" => $data['date_event']

	                );
	        }
	$ask->closecursor();
	echo json_encode($list);

}



if (isset($_POST['time'])) {

	date_default_timezone_set('UTC');
	$time = date('Y-m-d');

	if($_POST['time'] == "future"){
		
		future_event($time);
	}
	else{
		passed_event($time);
	}
}


