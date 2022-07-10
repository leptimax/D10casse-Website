function display_event(time){


    $("#area_event").html("");

    $.ajax({

            url: '../php/database_connection_event.php',
            type: 'POST',
            data:{time:time},
            dataType: 'json',
            success:function(response){

                console.log(response);

                if(response == 'error'){


                    $('#area_event').append("</br></br><div class=\"main_text\"><div class=\"text\"><h3 style=\"text-align:center;\">De nouveaux évènements arriveront bientôt, restez à l'affut ! </div></h3></div>");

                }
                else{
                    var len = response.length;

                    
                    for( var i = 0; i<len ; i++)
                    {
                        var id = response[i]['id'];
                        var name = response[i]['name'];
                        var description = response[i]['description'];
                        var picture = response[i]['picture'];
                        var date = response[i]['date'];

                        var date_split = date.split('-');
                        
                        var day = date_split[2];
                        var month = date_split[1];
                        var year = date_split[0];

                        switch(month){
                            case ("01"):
                                month = "Janvier";
                                break;
                            case "02":
                                month = "Février";
                                break;
                            case "03":
                                month = "Mars";
                                break;
                            case "04":
                                month = "Avril";
                                break;
                            case "05":
                                month = "Mai";
                                break;
                            case "06":
                                month = "Juin";
                                break;
                            case "07":
                                month = "Juillet";
                                break;
                            case "08":
                                month = "Août";
                                break;
                            case "09" : 
                                month = "Septembre";
                                break;
                            case "10":
                                month = "Octobre";
                                break;
                            case "11" : 
                                month = "Novembre";
                                break;
                            case "12" : 
                                month = "Décembre";
                                break;


                        }

                        //On ajoute les informations à la page

                        $('#area_event').append("</br></br><div id=\""+id+"\" class=\"boardgame\"></div>");
                        $('#'+id).append("</br><h1 class=\"short_info\" >"+name+"</h1></br>")
                        $('#'+id).append("<div class=\"picture_game\"><img class=\"picture\" src=\""+picture+"\" alt=\"image illustrant l\'évènement' "+name+"\"></div></br>");
                        $('#'+id).append("<div class=\"short_info\" >"+description+"</div></br>");
                        $('#'+id).append("<div style=\"font-weight: bold\" > RDV le "+day+" "+month+" "+year+" ! </div></br>")
                    } 
                }
            }

    });

}

display_event("future");