<?php

$db_host = getenv('MYSQL_HOST', true) ?: getenv('MYSQL_HOST');
$db_name = getenv('MYSQL_DATABASE', true) ?: getenv('MYSQL_DATABASE');
$db_user = getenv('MYSQL_USER', true) ?: getenv('MYSQL_USER');
$db_pwd  = getenv('MYSQL_PASSWORD', true) ?: getenv('MYSQL_PASSWORD');
$db_port = getenv('MYSQL_PORT', true) ?: getenv('MYSQL_PORT');


try
	{
		$DB = new PDO('mysql:host='.$db_host.';port='.$db_port.';dbname='.$db_name.';charset=utf8',$db_user,$db_pwd);
	}
	catch (Exception $e)
	{
		die('Erreur : ' . $e->getMessage());
	}

class Date{

	var $days = array("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche");

	var $months = array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" );


	function getEvents($year){
		global $DB;
		$req = $DB->prepare('SELECT id,title,date_event from event where YEAR(date_event) = ?');

		$req->execute(array($year));


		
		$r = array();
		while($d = $req->fetch(PDO::FETCH_OBJ)){
			$r[strtotime($d->date_event)][$d->id] = $d->title;
		}
		return $r;

	}

	function getAll($year){

		$r = array();

		$date = new Datetime($year.'-01-01');

		while($date->format('Y') <= $year){

			$year = $date->format('Y');
			$month = $date->format('n');
			$day = $date->format('j');
			$week = str_replace('0','7',$date->format('w'));
			$r[$year][$month][$day] = $week;

			$date->add(new DateInterval('P1D'));

		}
		

		return $r;

	}
}