function boardgame_management(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Jeux de Sociétés</h1></br>");
	$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_boardgame();\">Retour</button></div>");
	$('.main_text').append("<div class=\"text\"><h2>Gestion des jeux déjà présent : </h2></br></br></div></br></br>");

	$('.text').append("<label for=\"list_game\">Liste des jeux : </label>");
	$('.text').append("<select id=\"list_game\" name=\"list_game\"><option id=\"select_game\">Sélectionner un jeu</option></select>");

	$('.text').append("</br></br><div id=\"attribute_game\"></div>");

	fill_up_list_game();




}

function fill_up_list_game(){



	$.ajax({

        url: '../php/database_connexion_admin.php',
        type: 'POST',
        data:{fill_up_game:''},
        dataType: 'json',
        success:function(response){

        	for(var i = 0; i<response.length; i++){

        		var name = response[i]['name'];
        		var id = response[i]['id'];

        		$('#list_game').append("<option id=\""+id+"\">"+name+"</option>");

        	}

        }

    });

    $('#list_game').change(function(){
    	fill_up_attribute_game($('#list_game option:selected'));
    })

}

function fill_up_attribute_game(name){

	$('#attribute_game').html('');

	if(name[0]['id'] != "select_game"){

		$.ajax({

			url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{fill_up_attribute:name[0]['id']},
	        dataType: 'json',
	        success:function(response){

	        	for(var i = 0; i<response.length; i++){

	        		var name = response[0]['name'];
	        		var id = response[0]['id'];
	        		var description = response[0]['description'];
	        		var rule = response[0]['rule'];
	        		var link = response[0]['link'];
	        		var picture = response[0]['picture'];
	        		var complete_description = response[0]['complete_description'];
	        		var location = response[0]['location'];
	        		var nb_players_min = response[0]['nb_players_min'];
	        		var nb_players_max = response[0]['nb_players_max'];

	        		$('#attribute_game').append("</br></br><label for=\"nom_du_jeu\">Nom du jeu : </label>")
	        		$('#attribute_game').append("<textarea name=\"nom_du_jeu\" id=\"name_game\"rows=\"2\" cols=\"50\">");
	        		$('#name_game').val(name);

	        		$('#attribute_game').append("</br></br></br><label for=\"nb_players_min\">Nombre de Joueurs : de  </label>")
	        		$('#attribute_game').append("<input name=\"nb_players_min\" type=\"text\" id=\"players_min\" value=\""+nb_players_min+"\" size=5>");

	        		$('#attribute_game').append("<label for=\"nb_players_max\">    à    </label>")
	        		$('#attribute_game').append("<input name=\"nb_players_max\" type=\"text\" id=\"players_max\" value=\""+nb_players_max+"\" size = 5> joueurs");

	        		$('#attribute_game').append("</br></br></br><label for=\"short_desc\">Courte description (bien mettre < /br > pour les sauts de ligne !) : </label>")
	        		$('#attribute_game').append("<textarea name=\"short_desc\" id=\"short_desc\" rows=\"5\" cols=\"50\">");
	        		$('#short_desc').val(description);
	        	

	        		$('#attribute_game').append("</br></br></br><label for=\"regle_du_jeu\">Règle du jeu (en PDF) : </label>")
	        		$('#attribute_game').append("<textarea name=\"regle_du_jeu\" id=\"rule_game\" rows=\"2\" cols=\"50\">");
	        		$('#rule_game').val(rule);

	        		$('#attribute_game').append("</br></br></br><label for=\"video_regle_du_jeu\">Règle du jeu (video) : </label>")
	        		$('#attribute_game').append("<textarea name=\"video_regle_du_jeu\" id=\"movie_rule_game\" rows=\"2\" cols=\"50\">");
	        		$('#movie_rule_game').val(link);

	        		$('#attribute_game').append("</br></br></br><label for=\"image_du_jeu\">Image du jeu (en PDF) : </label>")
	        		$('#attribute_game').append("<textarea name=\"image_du_jeu\" id=\"picture_game\" rows=\"2\" cols=\"50\">");
	        		$('#picture_game').val(picture);

	        		$('#attribute_game').append("</br></br></br><label for=\"desc\">Description complète (bien mettre < /br > pour les sauts de ligne !) : </label>")
	        		$('#attribute_game').append("</br></br><textarea name=\"desc\" id=\"desc\" rows=\"10\" cols=\"100\">");
	        		$('#desc').val(complete_description);

	        		$('#attribute_game').append("</br></br></br><label for=\"localisation_du_jeu\">Localisation du jeu : </label>")
	        		$('#attribute_game').append("<select name=\"localisation_du_jeu\" type=\"text\" id=\"location_game\"></select>");

	        		if(location == "Calais"){
	        			$('#location_game').append("<option>Calais</option><option>Longuenesse</option><option>Dunkerque</option>");
	        		}
	        		else if(location == "Longuenesse"){
	        			$('#location_game').append("<option>Longuenesse</option><option>Calais</option><option>Dunkerque</option>");
	        		}
	        		else{
	        			$('#location_game').append("<option>Dunkerque</option><option>Longuenesse</option><option>Calais</option>");
	        		}

	        		$('#attribute_game').append("</br></br></br><div id=\"button_update_game\" style=\"display:flex; justify-content : space-around;\"></div>");
	        		$('#button_update_game').append("<button class=\"button button_update\" onclick=\"update_DB_boardgame()\"; >Mettre à jour</button>");
	        		$('#button_update_game').append("<button class=\"button button_suppress\" onclick=\"delete_boardgame()\"; >Supprimer</button>")




	        	}

	        }
			
		});
	}

}


function update_DB_boardgame(){

	if(confirm("Êtes-vous sûr de vouloir MODIFIER les informations ?")){

		var name = $('#name_game').val();
		var description = $('#short_desc').val();
		var rule = $('#rule_game').val();
		var link = $('#movie_rule_game').val();
		var picture = $('#picture_game').val();
		var complete_description = $('#desc').val();
		var location = $('#location_game').val();
		var nb_players_min = $('#players_min').val();
		var nb_players_max = $('#players_max').val();
		var nb_players = ""+nb_players_min+" à "+nb_players_max+" joueurs";

		var id_modif = $('#list_game option:selected')[0]['id'];
		
		var data = [name,description,rule,link,picture,complete_description,location,nb_players,nb_players_min,nb_players_max,id_modif];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{update_attribute_game:data},
	        dataType: 'json',
	        success:function(response){

	        	alert("Mise à jour effectuée !");
	        	launch_boardgame();

	        },
	        error:function(response){
	        	console.log(response);
	        }

	    });

	}

}

function delete_boardgame(){

	if(confirm("Êtes-vous sûr de vouloir SUPPRIMER les informations ?")){

		var id_modif = $('#list_game option:selected')[0]['id'];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{delete_attribute_boardgame:id_modif},
	        dataType: 'json',
	        success:function(response){

	        	alert("Suprression effectuée !");
	        	launch_boardgame()

	        },
	        error: function(response){
				console.log(response.responseText);

				}

	    });

	}
}

function create_boardgame(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Jeux de Sociétés</h1></br>");
	$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_boardgame();\">Retour</button></div>");
	$('.main_text').append("<div class=\"text\"></br><h2>Création d'un nouveau jeu : </h2></br></div>");
	$('.text').append("</br></br><div id=\"attribute_game\"></div>");


	$('#attribute_game').append("<form action=\"upload_picture.php\" method=\"POST>\"</br></br><label for=\"nom_du_jeu\">Nom du jeu : </label>")
	$('#attribute_game').append("<textarea name=\"nom_du_jeu\" id=\"name_game\"rows=\"2\" cols=\"50\">");

	$('#attribute_game').append("</br></br></br><label for=\"nb_players_min\">Nombre de Joueurs : de  </label>")
	$('#attribute_game').append("<input name=\"nb_players_min\" type=\"text\" id=\"players_min\" size=5>");

	$('#attribute_game').append("<label for=\"nb_players_max\">    à    </label>")
	$('#attribute_game').append("<input name=\"nb_players_max\" type=\"text\" id=\"players_max\" size = 5> joueurs");

	$('#attribute_game').append("</br></br></br><label for=\"short_desc\">Courte description (bien mettre < /br > pour les sauts de ligne !) : </label>")
	$('#attribute_game').append("<textarea name=\"short_desc\" id=\"short_desc\" rows=\"5\" cols=\"50\">");


	$('#attribute_game').append("</br></br></br><label for=\"regle_du_jeu\">Règle du jeu (en PDF) : </label>")
	$('#attribute_game').append("<textarea name=\"regle_du_jeu\" id=\"rule_game\" rows=\"2\" cols=\"50\">");

	$('#attribute_game').append("</br></br></br><label for=\"video_regle_du_jeu\">Règle du jeu (video) : </label>")
	$('#attribute_game').append("<textarea name=\"video_regle_du_jeu\" id=\"movie_rule_game\" rows=\"2\" cols=\"50\">");

	$('#attribute_game').append("</br></br><label for=\"image_du_jeu\">Image du jeu (chemin d'accès) : </label>")
	$('#attribute_game').append("<textarea name=\"image_du_jeu\" id=\"picture_game\" rows=\"2\" cols=\"50\">");

	$('#attribute_game').append("</br></br></br><label for=\"desc\">Description complète (bien mettre < /br > pour les sauts de ligne !) : </label>")
	$('#attribute_game').append("</br></br><textarea name=\"desc\" id=\"desc\" rows=\"10\" cols=\"100\">");

	$('#attribute_game').append("</br></br></br><label for=\"localisation_du_jeu\">Localisation du jeu : </label>")
	$('#attribute_game').append("<select name=\"localisation_du_jeu\" type=\"text\" id=\"location_game\"></select>");

	$('#location_game').append("<option>Calais</option><option>Longuenesse</option><option>Dunkerque</option>");

	$('#attribute_game').append("</br></br></br><div id=\"button_update_game\" style=\"display:flex; justify-content : space-around;\"></div>");
	$('#button_update_game').append("<button class=\"button button_update\"  onclick=\"create_DB_boardgame()\";>Créer</button></form>");


}


function create_DB_boardgame(){


	if(confirm("Êtes-vous sûr de vouloir CREER ce jeu avec ces informations ?")){

		var name = $('#name_game').val();
		var description = $('#short_desc').val();
		var rule = $('#rule_game').val();
		var link = $('#movie_rule_game').val();
		var picture = $('#picture_game').val();
		var complete_description = $('#desc').val();
		var location = $('#location_game').val();
		var nb_players_min = $('#players_min').val();
		var nb_players_max = $('#players_max').val();
		var nb_players = ""+nb_players_min+" à "+nb_players_max+" joueurs";
		
		var data = [name, description, rule, link, picture, complete_description, location, nb_players, nb_players_min, nb_players_max];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{create_game:data},
	        dataType: 'json',
	        success:function(response){
	        	alert("Création effectuée !");
	        	launch_boardgame();

	        },
	        error:function(response){
	        	console.log(response.responseText);
	        }

	    });

	}

}




function RPG_management(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Jeux de Rôles</h1></br>");
	$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_RPG();\">Retour</button></div>");
	$('.main_text').append("<div class=\"text\"><h2>Gestion des JDR déjà présent : </h2></br></br></div></br></br>");

	$('.text').append("<label for=\"list_game\">Liste des jeux : </label>");
	$('.text').append("<select id=\"list_game\" name=\"list_game\"><option id=\"select_game\">Sélectionner un jeu</option></select>");

	$('.text').append("</br></br><div id=\"attribute_game\"></div>");

	fill_up_list_RPG();




}

function fill_up_list_RPG(){



	$.ajax({

        url: '../php/database_connexion_admin.php',
        type: 'POST',
        data:{fill_up_RPG:''},
        dataType: 'json',
        success:function(response){

        	for(var i = 0; i<response.length; i++){

        		var name = response[i]['name'];
        		var id = response[i]['id'];

        		$('#list_game').append("<option id=\""+id+"\">"+name+"</option>");

        	}

        }

    });

    $('#list_game').change(function(){
    	fill_up_attribute_RPG($('#list_game option:selected'));
    })

}



function fill_up_attribute_RPG(name){

	$('#attribute_game').html('');

	if(name[0]['id'] != "select_game"){

		$.ajax({

			url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{fill_up_attribute_RPG:name[0]['id']},
	        dataType: 'json',
	        success:function(response){

	        	for(var i = 0; i<response.length; i++){

	        		var title = response[0]['name'];
	        		var id = response[0]['id'];
	        		var description = response[0]['description'];
	        		var rulebook = response[0]['rulebook'];
	        		var picture = response[0]['picture'];
	        		
	        		$('#attribute_game').append("</br></br><label for=\"nom_du_jeu\">Nom du jeu : </label>")
	        		$('#attribute_game').append("<textarea name=\"nom_du_jeu\" id=\"name_game\"rows=\"2\" cols=\"50\">");
	        		$('#name_game').val(title);

	        		
	        		$('#attribute_game').append("</br></br></br><label for=\"short_desc\">Courte description (bien mettre < /br > pour les sauts de ligne !) : </label>")
	        		$('#attribute_game').append("<textarea name=\"short_desc\" id=\"short_desc\" rows=\"7\" cols=\"100\">");
	        		$('#short_desc').val(description);
	        	

	        		$('#attribute_game').append("</br></br></br><label for=\"regle_du_jeu\">Règle du jeu (chemin d'accès) : </label>")
	        		$('#attribute_game').append("<textarea name=\"regle_du_jeu\" id=\"rule_game\" rows=\"2\" cols=\"50\">");
	        		$('#rule_game').val(rulebook);


	        		$('#attribute_game').append("</br></br></br><label for=\"image_du_jeu\">Image du jeu (chemin d'accès) : </label>")
	        		$('#attribute_game').append("<textarea name=\"image_du_jeu\" id=\"picture_game\" rows=\"2\" cols=\"50\">");
	        		$('#picture_game').val(picture);


	        		$('#attribute_game').append("</br></br></br><div id=\"button_update_game\" style=\"display:flex; justify-content : space-around;\"></div>");
	        		$('#button_update_game').append("<button class=\"button button_update\" onclick=\"update_DB_RPG()\"; >Mettre à jour</button>");
	        		$('#button_update_game').append("<button class=\"button button_suppress\" onclick=\"delete_RPG()\"; >Supprimer</button>")




	        	}

	        }
			
		});
	}

}

function create_RPG(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Jeux de Rôles</h1></br>");
	$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_RPG();\">Retour</button></div>");
	$('.main_text').append("<div class=\"text\"></br><h2>Création d'un nouveau jeu : </h2></br></div>");
	$('.text').append("</br></br><div id=\"attribute_game\"></div>");


	$('#attribute_game').append("</br></br><label for=\"nom_du_jeu\">Nom du jeu : </label>")
	$('#attribute_game').append("<textarea name=\"nom_du_jeu\" id=\"name_game\"rows=\"2\" cols=\"50\">");

	
	$('#attribute_game').append("</br></br></br><label for=\"short_desc\">Courte description (bien mettre < /br > pour les sauts de ligne !) : </label>")
	$('#attribute_game').append("<textarea name=\"short_desc\" id=\"short_desc\" rows=\"7\" cols=\"100\">");


	$('#attribute_game').append("</br></br></br><label for=\"regle_du_jeu\">Règle du jeu (chemin d'accès) : </label>")
	$('#attribute_game').append("<textarea name=\"regle_du_jeu\" id=\"rule_game\" rows=\"2\" cols=\"50\">");


	$('#attribute_game').append("</br></br></br><label for=\"image_du_jeu\">Image du jeu (chemin d'accès) : </label>")
	$('#attribute_game').append("<textarea name=\"image_du_jeu\" id=\"picture_game\" rows=\"2\" cols=\"50\">");
	
	$('#attribute_game').append("</br></br></br><div id=\"button_update_game\" style=\"display:flex; justify-content : space-around;\"></div>");
	$('#button_update_game').append("<button class=\"button button_update\"  onclick=\"create_DB_RPG()\";>Créer</button></form>");


}

function update_DB_RPG(){

	if(confirm("Êtes-vous sûr de vouloir MODIFIER les informations ?")){

		var name = $('#name_game').val();
		var description = $('#short_desc').val();
		var rule = $('#rule_game').val();
		var picture = $('#picture_game').val();

		var id_modif = $('#list_game option:selected')[0]['id'];
		
		var data = [name,description,rule,picture,id_modif];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{update_attribute_RPG:data},
	        dataType: 'json',
	        success:function(response){

	        	alert("Mise à jour effectuée !");
	        	console.log(response);
	        	launch_RPG();

	        },
	        error:function(response){
	        	console.log(response.responseText);
	        }

	    });

	}

}

function delete_RPG(){

	if(confirm("Êtes-vous sûr de vouloir SUPPRIMER les informations ?")){

		var id_modif = $('#list_game option:selected')[0]['id'];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{delete_attribute_RPG:id_modif},
	        dataType: 'json',
	        success:function(response){

	        	alert("Suprression effectuée !");
	        	launch_RPG()

	        },
	        error: function(response){
				console.log(response.responseText);

				}

	    });

	}
}

function create_DB_RPG(){


	if(confirm("Êtes-vous sûr de vouloir CREER ce RPG avec ces informations ?")){

		var name = $('#name_game').val();
		var description = $('#short_desc').val();
		var rule = $('#rule_game').val();
		var picture = $('#picture_game').val();
		
		var data = [name, description, rule, picture];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{create_RPG:data},
	        dataType: 'json',
	        success:function(response){
	        	alert("Création effectuée !");
	        	launch_RPG();

	        },
	        error:function(response){
	        	console.log(response.responseText);
	        }

	    });

	}

}



function Event_management(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Evènements</h1></br>");
	$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_Event();\">Retour</button></div>");
	$('.main_text').append("<div class=\"text\"><h2>Gestion des jeux déjà présent : </h2></br></br></div></br></br>");

	$('.text').append("<label for=\"list_month\">Veuillez choisir un mois : </label>");
	$('.text').append("<select id=\"list_month\" name=\"list_month\"><option id=\"select_month\">Sélectionner un mois</option></select>");
	$('#list_month').append("<option id=\"01\">Janvier</option><option id=\"02\">Février</option><option id=\"03\">Mars</option><option id=\"04\">Avril</option><option id=\"05\">Mai</option>");
	$('#list_month').append("<option id=\"06\">Juin</option><option id=\"07\">juillet</option><option id=\"08\">Août</option><option id=\"09\">Septembre</option><option id=\"10\">Octobre</option><option id=\"11\">Novembre</option><option id=\"12\">Décembre</option>");

	$('.text').append("</br></br><div id=\"attribute_game_temp\"></div>")
	$('.text').append("</br></br><div id=\"attribute_game\"></div>");

	$('#list_month').change(function(){

		list_event($('#list_month option:selected')[0]['id']);

	})
	


}




function list_event(month){

	$('#attribute_game').html('');
	$('#attribute_game_temp').html('');
	if(month != "select_month"){
		$('#attribute_game_temp').append("<label for=\"list_game\">Liste des jeux : </label>");
		$('#attribute_game_temp').append("<select id=\"list_game\" name=\"list_game\"><option id=\"select_game\">Sélectionner un évènement</option></select>");
		fill_up_list_event(month);
	}		
}

function fill_up_list_event(month){

	DateTime = new Date();
	var year = DateTime.getFullYear();
	var date_min = ''+year+'-'+month+'-01';
	var date_max = ''+year+'-'+month+'-31';
	$.ajax({

        url: '../php/database_connexion_admin.php',
        type: 'POST',
        data:{fill_up_event_min:date_min,fill_up_event_max:date_max},
        dataType: 'json',
        success:function(response){

        	if(response != null){
	        	for(var i = 0; i<response.length; i++){

	        		var name = response[i]['name'];
	        		var id = response[i]['id'];

	        		$('#list_game').append("<option id=\""+id+"\">"+name+"</option>");

	        	}
	        }
	        else{
	        	$('#attribute_game').append('</br></br><h3 style=\"text-align:center;\">Aucun évènement n\'existe pour ce mois</h3>');
	        }

        },
        error:function(argument) {
        	console.log(argument.responseText);
        }

    });

    $('#list_game').change(function(){
    	fill_up_attribute_event($('#list_game option:selected')[0]['id']);
    })

}

function fill_up_attribute_event(id){

	$('#attribute_game').html('');

	if(id != "select_game"){

		$.ajax({

			url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{fill_up_attribute_event:id},
	        dataType: 'json',
	        success:function(response){

	        	for(var i = 0; i<response.length; i++){

	        		var title = response[0]['name'];
	        		var id = response[0]['id'];
	        		var description = response[0]['description'];
	        		var date_event = response[0]['date_event'];
	        		var picture = response[0]['picture'];

	        		
	        		$('#attribute_game').append("</br></br><label for=\"nom_du_jeu\">Nom de l'évènement : </label>")
	        		$('#attribute_game').append("<textarea name=\"nom_du_jeu\" id=\"name_game\"rows=\"2\" cols=\"50\">");
	        		$('#name_game').val(title);

	        		
	        		$('#attribute_game').append("</br></br></br><label for=\"short_desc\">Description (bien mettre < /br > pour les sauts de ligne !) : </label>")
	        		$('#attribute_game').append("<textarea name=\"short_desc\" id=\"short_desc\" rows=\"7\" cols=\"100\">");
	        		$('#short_desc').val(description);
	        	

	        		$('#attribute_game').append("</br></br></br><label for=\"date_event\">Date de l'évènement : </label>")
	        		$('#attribute_game').append("<input type=\"date\" name=\"date_event\" id=\"date_event\"></input>");
	        		$('#date_event').val(date_event);


	        		$('#attribute_game').append("</br></br></br><label for=\"image_du_jeu\">Image de l'évènement (chemin d'accès) : </label>")
	        		$('#attribute_game').append("<textarea name=\"image_du_jeu\" id=\"picture_game\" rows=\"2\" cols=\"50\">");
	        		$('#picture_game').val(picture);


	        		$('#attribute_game').append("</br></br></br><div id=\"button_update_game\" style=\"display:flex; justify-content : space-around;\"></div>");
	        		$('#button_update_game').append("<button class=\"button button_update\" onclick=\"update_DB_event()\"; >Mettre à jour</button>");
	        		$('#button_update_game').append("<button class=\"button button_suppress\" onclick=\"delete_event()\"; >Supprimer</button>");
	        		



	        	}

	        },
	        error:function(response){
	        	console.log(response.responseText);
	        }
			
		});
	}

}


function create_event(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Evènements</h1></br>");
	$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_Event();\">Retour</button></div>");
	$('.main_text').append("<div class=\"text\"></br><h2>Création d'un nouvel évènement : </h2></br></div>");
	$('.text').append("</br></br><div id=\"attribute_game\"></div>");


	$('#attribute_game').append("</br></br><label for=\"nom_du_jeu\">Nom de l'évènement : </label>")
	$('#attribute_game').append("<textarea name=\"nom_du_jeu\" id=\"name_game\"rows=\"2\" cols=\"50\">");

	
	$('#attribute_game').append("</br></br></br><label for=\"short_desc\">Description (bien mettre < /br > pour les sauts de ligne !) : </label>")
	$('#attribute_game').append("</br></br><textarea name=\"short_desc\" id=\"short_desc\" rows=\"7\" cols=\"100\">");


	$('#attribute_game').append("</br></br></br><label for=\"date_event\">Date de l'évènement : </label>")
	$('#attribute_game').append("<input type=\"date\" name=\"date_event\" id=\"date_event\"></input>");


	$('#attribute_game').append("</br></br></br><label for=\"image_du_jeu\">Image de l'évènement (chemin d'accès) : </label>")
	$('#attribute_game').append("<textarea name=\"image_du_jeu\" id=\"picture_game\" rows=\"2\" cols=\"50\">");


	$('#attribute_game').append("</br></br></br><div id=\"button_update_game\" style=\"display:flex; justify-content : space-around;\"></div>");
	$('#button_update_game').append("<button class=\"button button_update\"  onclick=\"create_DB_event()\";>Créer</button></form>");



}

function update_DB_event(){

	if(confirm("Êtes-vous sûr de vouloir MODIFIER les informations ?")){

		var name = $('#name_game').val();
		var description = $('#short_desc').val();
		var date_event = $('#date_event').val();
		var picture = $('#picture_game').val();

		var id_modif = $('#list_game option:selected')[0]['id'];
		
		var data = [name,description,date_event,picture,id_modif];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{update_attribute_event:data},
	        dataType: 'json',
	        success:function(response){

	        	alert("Mise à jour effectuée !");
	        	launch_Event();

	        },
	        error:function(response){
	        	console.log(response.responseText);
	        }

	    });

	}

}

function delete_event(){

	if(confirm("Êtes-vous sûr de vouloir SUPPRIMER les informations ?")){

		var id_modif = $('#list_game option:selected')[0]['id'];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{delete_attribute_event:id_modif},
	        dataType: 'json',
	        success:function(response){

	        	alert("Suprression effectuée !");
	        	launch_Event()

	        },
	        error: function(response){
				console.log(response.responseText);

				}

	    });

	}
}

function create_DB_event(){


	if(confirm("Êtes-vous sûr de vouloir CREER ce RPG avec ces informations ?")){

		var name = $('#name_game').val();
		var description = $('#short_desc').val();
		var date_event = $('#date_event').val();
		var picture = $('#picture_game').val();
		
		var data = [name, description, date_event, picture];
		$.ajax({

	        url: '../php/database_connexion_admin.php',
	        type: 'POST',
	        data:{create_event:data},
	        dataType: 'json',
	        success:function(response){
	        	alert("Création effectuée !");
	        	launch_Event();

	        },
	        error:function(response){
	        	console.log(response.responseText);
	        }

	    });

	}

}



function upload_picture(title){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">"+title+"</h1></br>");

	if(title == "Jeux de Sociétés"){
		$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_boardgame();\">Retour</button></div>");
	}
	if(title == "Jeux de Rôles"){
		$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_RPG();\">Retour</button></div>");
	}
	if(title == "Evènements"){
		$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_Event();\">Retour</button></div>");
	
	}
	$('.main_text').append("<div class=\"text\"></br><h2>Ajout d'une nouvelle image : </h2></br></div>");
	$('.text').append("</br></br><div id=\"attribute_game\"></div>");

	$('#attribute_game').append("<form action=\"upload_picture.php\" method=\"POST\" id=\"uploadPicture\" enctype=\"multipart/form-data\"></form>");

	$('#uploadPicture').append("<input type=\"file\" name=\"upload_picture\" id=\"new_picture\" accept=\"image/png, image/jpeg\"></input>");
	$('#uploadPicture').append("</br></br><div style=\"display:flex; justify-content:center;\"><button class=\"button button_update\" type=\"submit\">Valider</button></div>");


}

function upload_rulebook(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Jeux de Rôles</h1></br>");
	$('.main_text').append("<div style=\"display:flex; justify-content:center;\"><button class=\"button button_choice\" onclick=\"launch_RPG();\">Retour</button></div>");
	$('.main_text').append("<div class=\"text\"></br><h2>Ajout d'une nouvelle image : </h2></br></div>");
	$('.text').append("</br></br><div id=\"attribute_game\"></div>");

	$('#attribute_game').append("<form action=\"upload_picture.php\" method=\"POST\" id=\"uploadPicture\" enctype=\"multipart/form-data\"></form>");

	$('#uploadPicture').append("<input type=\"file\" name=\"upload_picture\" id=\"new_picture\"></input>");
	$('#uploadPicture').append("</br></br><div style=\"display:flex; justify-content:center;\"><button class=\"button button_update\" type=\"submit\">Valider</button></div>");


}

function launch_boardgame(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Jeux de Sociétés</h1></br></br>");
	$('.main_text').append('<div id=\"temp\" style=\"display:flex;justify-content:center;\"></div>')
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"boardgame_management();\">Gestion des jeux déjà présent</h2></br></br></div></br></br>");
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"create_boardgame();\">Ajouter un nouveau jeu</h2></br></br></div></br></br>");
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"upload_picture(\'Jeux de Sociétés\');\">Ajouter une nouvelle image</h2></br></br></div></br></br>");
}


function launch_RPG(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Jeux de Rôles</h1></br></br>");
	$('.main_text').append('<div id=\"temp\" style=\"display:flex;justify-content:center;\"></div>')
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"RPG_management();\">Gestion des JDR déjà présent</h2></br></br></div></br></br>");
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"create_RPG();\">Ajouter un nouveau JDR</h2></br></br></div></br></br>");
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"upload_picture(\'Jeux de Rôles\');\">Ajouter une nouvelle image</h2></br></br></div></br></br>");
	$('#temp').append("</br><div class=\"text\"><button class=\"button button_choice\" onclick=\"upload_rulebook();\">Ajouter un nouveau livre de règle</h2></br></br></div></br></br>");

}

function launch_Event(){

	$('.main_text').html('');
	$('.main_text').append("<h1 style=\"text-align:center;\">Evènements</h1></br></br>");
	$('.main_text').append('<div id=\"temp\" style=\"display:flex;justify-content:center;\"></div>')
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"Event_management();\">Gestion des évènements déjà présent</h2></br></br></div></br></br>");
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"create_event();\">Ajouter un nouvel évènement</h2></br></br></div></br></br>");
	$('#temp').append("<div class=\"text\"><button class=\"button button_choice\" onclick=\"upload_picture(\'Evènements\');\">Ajouter une nouvelle image</h2></br></br></div></br></br>");
	
}


launch_boardgame();


