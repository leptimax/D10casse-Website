<?php

header("Access-Control-Allow-Origin: *");

    /* La variable superglobale $_FILES nous donne accès aux fichiers
    qui ont été uploadés. La clé "background" fait référence à
    l'attribut name de <input name="background" /> */
    $file = $_FILES["upload_picture"];
    echo($file["tmp_name"]);
    $isFileUploaded = move_uploaded_file($file["tmp_name"], "D10/html/picture/" . $file["name"]);

    if($isFileUploaded === false) {
        http_response_code(500);
        echo "Problème serveur";
    }
    else {
        http_response_code(201);
        include("admin.html");
        exit();
    }

