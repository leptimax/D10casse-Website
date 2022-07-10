<?php 


$db_host = getenv('MYSQL_HOST', true) ?: getenv('MYSQL_HOST');
$db_name = getenv('MYSQL_DATABASE', true) ?: getenv('MYSQL_DATABASE');
$db_user = getenv('MYSQL_USER', true) ?: getenv('MYSQL_USER');
$db_pwd  = getenv('MYSQL_PASSWORD', true) ?: getenv('MYSQL_PASSWORD');
$db_port = getenv('MYSQL_PORT', true) ?: getenv('MYSQL_PORT');


function future_event($time,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
	$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
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

function passed_event($time,$db_port,$db_host,$db_name,$db_user,$db_pwd){

	try
	{
		$bdd = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
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
		
		future_event($time,$db_port,$db_host,$db_name,$db_user,$db_pwd);
	}
	else{
		passed_event($time,$db_port,$db_host,$db_name,$db_user,$db_pwd);
	}
}


