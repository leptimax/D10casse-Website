<?php

try
	{
	$DB = new PDO('mysql:host=localhost;dbname=d10casse;charset=utf8','root','');
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