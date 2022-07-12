


//On affiche autoamtiquement la liste des jeux dès qu'on lance la page jeux de société
function info_boardgame(page){


    var key1 = "";
    $('#list_game').html('');
    $.ajax({

        url: '../php/database_connection.php',
        type: 'POST',
        data:{key1:key1},
        dataType: 'json',
        success:function(response){


            var len = response.length;
            var i;
            var next = 0;
            

            //on limite l'affichage à 5 éléments par page
            for( i = 5*(page-1); i<(5*page) ; i++)
            {

                if(i >= len){
                    break;
                    next = 0;
                }
                var id = response[i]['id'];
                var name = response[i]['name'];
                var description = response[i]['description'];
                var picture = response[i]['picture'];
                var nb_players = response[i]['nb_players'];

                //On ajoute les informations à la page

                $('#list_game').append("</br></br><div id=\""+id+"\" class=\"boardgame\"></div>");
                $('#'+id).append("</br><h1 class=\"short_info\" >"+name+"</h1></br>")
                $('#'+id).append("<div class=\"picture_game\"><img class=\"picture\" src=\""+picture+"\" alt=\"image du jeu "+name+"\"></div></br>");
                $('#'+id).append("<div class=\"short_info\" >"+description+"</div></br>");
                $('#'+id).append("<div class=\"short_info\" >De "+nb_players+"</div></br></br>");
                $('#'+id).append("<div style=\"text-align:center;display: flex; justify-content:center;padding-bottom:1rem;\"><div class=\"button_info\" onclick=more_information("+id+")>Plus d'information</div></div>");
                next = 1;
               
            }

            $('#list_game').append("<div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div>");
        
            if(5*(page-1) != 0){

                $('#changePage').append("<a  href=\"#\" onclick=\"info_boardgame("+(page-1)+")\">Précédent</a>");

            }

            if(i != len && next == 1){

                $('#changePage').append("<a  href=\"#\" onclick=\"info_boardgame("+(page+1)+")\">Suivant</a>");

            }

            
            
        }

    });
}

//fonction permettant d'afficher les informations complémentaire au jeu sélectionné

function more_information(id){


    //on efface le contenu de la div avant de la remplir avec les nouvelles information
    $("#list_game").html('');

    $.ajax({

            url: '../php/database_connection.php',
            type: 'POST',
            data:{id_boardgame:id},
            dataType: 'json',
            success:function(response){


                var len = response.length;

            
                var id = response[0]['id'];
                var name = response[0]['name'];
                var description = response[0]['description'];
                var picture = response[0]['picture'];
                var nb_players = response[0]['nb_players'];
                var rule = response[0]['rule'];
                var link = response[0]['link'];
                var complete_description = response[0]['complete_description'];
                var location = response[0]['location']


                //On ajoute les options à la page

                $('#list_game').append("</br></br><div id=\""+id+"\" class=\"boardgame\"></div>");
                $('#'+id).append("<h1 style=\"padding-top: 2rem;text-align:center;\">"+name+"</h1></br></br>");
                $('#'+id).append("<div style=\"text-align:center;\"><img class=\"picture\" src=\""+picture+"\" alt=\"image du jeu "+name+"\"></div></br>");
                $('#'+id).append("<div class=\"description_boardgame\" style=\"text-align:center;\">"+description+"</div></br></br>");
                $('#'+id).append("<h3 style=\"text-align:center;\">Informations générale :</h3></br></br>");
                $('#'+id).append("<div class=\"description_boardgame\">"+complete_description+"</div></br></br>");
                $('#'+id).append("<div class=\"description_boardgame\" style=\"text-align:center;\"><ul><li>Nombre de joueurs : "+nb_players+"</li><li></li></div></br></br>");
                $('#'+id).append("<h3 style=\"text-align:center;\">Règles du jeu :</h3></br></br>");
                $('#'+id).append("<div class=\"description_boardgame\" style=\"text-align:center; padding-bottom:2rem;\">La règle du jeu est disponible ici : <a href=\""+rule+"\" target=\"_blank\" >"+name+"</a></br></br>Vous trouverez une explication vidéo des règles : <a href=\""+link+"\" target=\"_blank\">HERE</a></div>");
                $('#'+id).append("<h3 style=\"text-align:center;\">Localisation actuelle du jeu :</h3></br></br>");
                $('#'+id).append("<div class=\"description_boardgame\">"+location+"</div></br></br>");


                



            }

    });

//permet de remonter en haut de page au chargement

    window.scrollTo(0,0);

}

//on affiche le système de tri par nom

function display_sort_name(){

    var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","J","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","TOUS LES JEUX"];
    var len = alphabet.length;

    $('#sort').append("<div style=\"text-align: center;\"><label for=\"title\">Entrez le nom du jeu :  </label><input id=\"Text\" type=\"text\" name=\"title\"></div></br>");
    
    for(var i = 0; i<len; i++){
        var lettre = alphabet[i];

        if(i == len-1){
            $("#sort").append("</br></br><a href=\"#\" onclick=sortGameByLetter(\'ALL\');>"+lettre+"</a>");
        }
        else{
            $('#sort').append("<a href=\"#\" onclick=sortGameByLetter(\""+lettre+"\");>"+lettre+"</a> - ");
        }
    }

    
    var text = document.getElementById('Text');
    text.addEventListener('input',function(mot){update_title(mot.target.value)});
    
    
    

}


function getGameByTitle(title,page){


    $.ajax({

            url: '../php/database_connection.php',
            type: 'POST',
            data:{title:title, key1:''},
            dataType: 'json',
            success:function(response){

                if(response != "none"){
                    var len = response.length;
                    var i;
                    var next = 0;
                    

                    //on limite l'affichage à 5 éléments par page
                    for( i = 5*(page-1); i<(5*page) ; i++)
                    {

                        if(i >= len){
                            break;
                            next = 0;
                        }
                        var id = response[i]['id'];
                        var name = response[i]['name'];
                        var description = response[i]['description'];
                        var picture = response[i]['picture'];
                        var nb_players = response[i]['nb_players'];

                        //On ajoute les informations à la page

                        $('#list_game').append("</br></br><div id=\""+id+"\" class=\"boardgame\"></div>");
                        $('#'+id).append("</br><h1 class=\"short_info\" >"+name+"</h1></br>")
                        $('#'+id).append("<div class=\"picture_game\"><img class=\"picture\" src=\""+picture+"\" alt=\"image du jeu "+name+"\"></div></br>");
                        $('#'+id).append("<div class=\"short_info\" >"+description+"</div></br>");
                        $('#'+id).append("<div class=\"short_info\" >De "+nb_players+"</div></br></br>");
                        $('#'+id).append("<div style=\"text-align:center;display: flex; justify-content:center;padding-bottom:1rem;\"><div class=\"button_info\" onclick=more_information("+id+")>Plus d'information</div></div>");
                        next = 1;
                       
                    }

                    if((5*(page-1) != 0) || (i != len && next == 1)){
                        $('#list_game').append("<div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div>");
                    
                        if(5*(page-1) != 0){

                        $('#changePage').append("<a  href=\"#\" onclick=\"getGameByTitle(\'"+title+"\',"+(page-1)+")\">Précédent</a>");

                        }

                        if(i != len && next == 1){

                            $('#changePage').append("<a  href=\"#\" onclick=\"getGameByTitle(\'"+title+"\',"+(page+1)+")\">Suivant</a>");

                        }
                    }

                }

                else
                {
                    $('#list_game').append("</br></br><div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div></br></br>");
                    $('#changePage').append("<h3 style=\"text-align:center\">Aucun résultat correspondant aux critères n'a été trouvé !</h3>");
                }

                

            
        }

    });


}

function sort_name_player(title,player,page){

    $('#list_game').html('');
    $.ajax({

            url: '../php/database_connection.php',
            type: 'POST',
            data:{title:title,player:player,key2:''},
            dataType: 'json',
            success:function(response){

                if(response != "none"){
                    var len = response.length;
                    var i;
                    var next = 0;
                    

                    //on limite l'affichage à 5 éléments par page
                    for( i = 5*(page-1); i<(5*page) ; i++)
                    {

                        if(i >= len){
                            break;
                            next = 0;
                        }
                        var id = response[i]['id'];
                        var name = response[i]['name'];
                        var description = response[i]['description'];
                        var picture = response[i]['picture'];
                        var nb_players = response[i]['nb_players'];

                        //On ajoute les informations à la page

                        $('#list_game').append("</br></br><div id=\""+id+"\" class=\"boardgame\"></div>");
                        $('#'+id).append("</br><h1 class=\"short_info\" >"+name+"</h1></br>")
                        $('#'+id).append("<div class=\"picture_game\"><img class=\"picture\" src=\""+picture+"\" alt=\"image du jeu "+name+"\"></div></br>");
                        $('#'+id).append("<div class=\"short_info\" >"+description+"</div></br>");
                        $('#'+id).append("<div class=\"short_info\" >De "+nb_players+"</div></br></br>");
                        $('#'+id).append("<div style=\"text-align:center;display: flex; justify-content:center;padding-bottom:1rem;\"><div class=\"button_info\" onclick=more_information("+id+")>Plus d'information</div></div>");
                        next = 1;
                       
                    }

                    if((5*(page-1) != 0) || (i != len && next == 1)){
                        $('#list_game').append("<div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div>");
                    
                        if(5*(page-1) != 0){

                        $('#changePage').append("<a  href=\"#\" onclick=\"sort_name_player(\'"+title+"\',"+player+","+(page-1)+")\">Précédent</a>");

                        }

                        if(i != len && next == 1){

                            $('#changePage').append("<a  href=\"#\" onclick=\"sort_name_player(\'"+(title)+"\',"+player+","+(page+1)+")\">Suivant</a>");

                        }
                    }

                }

                else
                {
                    $('#list_game').append("</br></br><div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div></br></br>");
                    $('#changePage').append("<h3 style=\"text-align:center\">Aucun résultat correspondant aux critères n'a été trouvé !</h3>");
                }

                

            
        }

    });


}

function sort_name_location(title,location,page){

    $('#list_game').html('');
    $.ajax({

            url: '../php/database_connection.php',
            type: 'POST',
            data:{title:title,location:location,key3:''},
            dataType: 'json',
            success:function(response){


                if(response != "none"){
                    var len = response.length;
                    var i;
                    var next = 0;
                    

                    //on limite l'affichage à 5 éléments par page
                    for( i = 5*(page-1); i<(5*page) ; i++)
                    {

                        if(i >= len){
                            break;
                            next = 0;
                        }
                        var id = response[i]['id'];
                        var name = response[i]['name'];
                        var description = response[i]['description'];
                        var picture = response[i]['picture'];
                        var nb_players = response[i]['nb_players'];

                        //On ajoute les informations à la page

                        $('#list_game').append("</br></br><div id=\""+id+"\" class=\"boardgame\"></div>");
                        $('#'+id).append("</br><h1 class=\"short_info\" >"+name+"</h1></br>")
                        $('#'+id).append("<div class=\"picture_game\"><img class=\"picture\" src=\""+picture+"\" alt=\"image du jeu "+name+"\"></div></br>");
                        $('#'+id).append("<div class=\"short_info\" >"+description+"</div></br>");
                        $('#'+id).append("<div class=\"short_info\" >De "+nb_players+"</div></br></br>");
                        $('#'+id).append("<div style=\"text-align:center;display: flex; justify-content:center;padding-bottom:1rem;\"><div class=\"button_info\" onclick=more_information("+id+")>Plus d'information</div></div>");
                        next = 1;
                       
                    }

                    if((5*(page-1) != 0) || (i != len && next == 1)){
                        $('#list_game').append("<div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div>");
                    
                        if(5*(page-1) != 0){

                        $('#changePage').append("<a  href=\"#\" onclick=\"sort_name_location(\'"+title+"\',\'"+location+"\',"+(page-1)+")\">Précédent</a>");

                        }

                        if(i != len && next == 1){

                            $('#changePage').append("<a  href=\"#\" onclick=\"sort_name_location(\'"+title+"\',\'"+location+"\',"+(page+1)+")\">Suivant</a>");

                        }
                    }

                }

                else
                {
                    $('#list_game').append("</br></br><div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div></br></br>");
                    $('#changePage').append("<h3 style=\"text-align:center\">Aucun résultat correspondant aux critères n'a été trouvé !</h3>");
                }

                

            
        }

    });

}

function global_sort(title,player,location,page){


    $('#list_game').html('');
    $.ajax({

            url: '../php/database_connection.php',
            type: 'POST',
            data:{title:title,player:player,location:location},
            dataType: 'json',
            success:function(response){

                if(response != "none"){
                    var len = response.length;
                    var i;
                    var next = 0;
                    

                    //on limite l'affichage à 5 éléments par page
                    for( i = 5*(page-1); i<(5*page) ; i++)
                    {

                        if(i >= len){
                            break;
                            next = 0;
                        }
                        var id = response[i]['id'];
                        var name = response[i]['name'];
                        var description = response[i]['description'];
                        var picture = response[i]['picture'];
                        var nb_players = response[i]['nb_players'];

                        //On ajoute les informations à la page

                        $('#list_game').append("</br></br><div id=\""+id+"\" class=\"boardgame\"></div>");
                        $('#'+id).append("</br><h1 class=\"short_info\" >"+name+"</h1></br>")
                        $('#'+id).append("<div class=\"picture_game\"><img class=\"picture\" src=\""+picture+"\" alt=\"image du jeu "+name+"\"></div></br>");
                        $('#'+id).append("<div class=\"short_info\" >"+description+"</div></br>");
                        $('#'+id).append("<div class=\"short_info\" >De "+nb_players+"</div></br></br>");
                        $('#'+id).append("<div style=\"text-align:center;display: flex; justify-content:center;padding-bottom:1rem;\"><div class=\"button_info\" onclick=more_information("+id+")>Plus d'information</div></div>");
                        next = 1;
                       
                    }

                    if((5*(page-1) != 0) || (i != len && next == 1)){
                        $('#list_game').append("<div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div>");
                    
                        if(5*(page-1) != 0){

                        $('#changePage').append("<a  href=\"#\" onclick=\"global_sort(\'"+title+"\',"+player+",\'"+location+"\',"+(page-1)+")\">Précédent</a>");

                        }

                        if(i != len && next == 1){

                            $('#changePage').append("<a  href=\"#\" onclick=\"global_sort(\'"+title+"\',"+player+",\'"+location+"\',"+(page+1)+")\">Suivant</a>");

                        }
                    }

                }

                else
                {
                    $('#list_game').append("</br></br><div class=\"main_text\"><div id=\"changePage\" class=\"text\" style=\"display: flex; justify-content:space-around;\"></div></div></br></br>");
                    $('#changePage').append("<h3 style=\"text-align:center\">Aucun résultat correspondant aux critères n'a été trouvé !</h3>");
                }
            }

    });

}



window.nbPlayers_global = $('#nb_players option:selected')[0]['id'];
window.location_global = $('#location option:selected')[0]['id'];
window.title_global = '';


function sortGameByLetter(letter){

    $('select').each(function(){
        $(this).val( $(this).find("option:first").val() );
    })
    sortGameByName(letter);
    


}


//fonction permettant de gérer l'ensemble du tri par nom
function sortGameByName(mot){


    $('#list_game').html('');
    mot = mot.toUpperCase();
    
    if(mot == "" || mot=="ALL")
    {
        info_boardgame(1);
        return;
    }
    else
    {
        getGameByTitle(mot,1);
    }

}

$('#nb_players').change(function(){
    var element = $("#nb_players option:selected")[0]['value'];
    update_players(element);

});

$('#location').change(function(){
    location_global = $("#location option:selected")[0]['value'];
    sort(nbPlayers_global,location_global,title_global);
});



function update_players(element){

    nbPlayers_global = element;
    sort(nbPlayers_global,location_global,title_global);
}

function update_title(word){

    title_global = word;
    sort(nbPlayers_global,location_global,title_global);
}






function sort(player,location,title){

    $('#list_game').html('');
    if((player == "select_players") && (location == "select_campus")){

        sortGameByName(title);

    }

    else if(player != "select_players" && (location == "select_campus")){

        title = title.toUpperCase();

        if(player == "Plus de 7")
            player = 8;

        sort_name_player(title,player,1);

    }
    else if((player == "select_players") && (location != "select_campus")){

        title = title.toUpperCase();
        sort_name_location(title,location,1);
    }

    else{


        title = title.toUpperCase();
        if(player == "Plus de 7")
            player = 8;
        global_sort(title,player,location,1);

    }




}




info_boardgame(1);
display_sort_name();

