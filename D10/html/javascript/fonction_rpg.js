var key5 = "";
$.ajax({

            url: '../php/database_connection_RPG.php',
            type: 'POST',
            data:{key5:key5},
            dataType: 'json',
            success:function(response){


                var len = response.length;

                
                for( var i = 0; i<len ; i++)
                {
                    var id = response[i]['id'];
                    var title = response[i]['title'];
                    var picture = response[i]['picture'];

                    //On ajoute les informations à la page


                    $('#list_rpg').append("<div id=\""+id+"\"  class=\"RPG\"></br><h1 class=\"short_info\" >"+title+"</h1></br></div>");
                    $('#'+id).append("<div class=\"picture_game_rpg\"><img class=\"picture_rpg\" src=\""+picture+"\" alt=\"image du jeu "+title+"\" onclick=\"more_information_rpg("+id+")\"></div></br>");

                    }
            }

});


//fonction permettant d'afficher les informations compplémentaire sur le JDR choisit
function more_information_rpg(name) {

    $.ajax({

            url: '../php/database_connection_RPG.php',
            type: 'POST',
            data:{id_RPG:name},
            dataType: 'json',
            success:function(response){


                var len = response.length;
                $('.text').html('');

                
                
                var id = response[0]['id'];
                var title = response[0]['title'];
                var picture = response[0]['picture'];
                var rule_book = response[0]['rule_book'];
                var description = response[0]['description'];

                //On ajoute les informations à la page


                $('.text').append("<h1 style=\"text-align:center;\"class=\"short_info\" >"+title+" :</h1></br>");
                $('.text').append("<div class=\"picture_game_rpg\"><img class=\"picture_rpg_detail\" src=\""+picture+"\" alt=\"image du jeu"+title+"\"></div></br>")
                $('.text').append("<p>"+description+"</p>");
                $('.text').append("</br></br><p style=\"text-align: center; font-weight:bold;\"><a href=\"\" download=\""+rule_book+"\">Le livre de règle</a></p></li></br>");
        
                
            



    

    }

    

//permet de remonter en haut de page au chargement

    
    });

    window.scrollTo(0,0);

}