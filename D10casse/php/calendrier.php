<!DOCTYPE html>
<html lang="fr">

<head>

  <!--Information de la page-->

  <meta charset="utf-8"/>
  <title>D10Cassé</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!--Importation-->

  <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

  <script src="https://code.jquery.com/jquery-3.5.1.js"
  integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
  crossorigin="anonymous"></script>

  <link rel="stylesheet" href="../css/style3.css">
  <link rel="stylesheet" href="../css/style_calendrier.css">

  
</head>
<body>

<!--Barre de navigation et titre de page-->
  <head>
    <div id="main_header">

    <img class="logo" src="../picture/LogoD10-2021.svg" alt=""/>
    <h1 id="title" style="text-align: center;">Evènements</h1>
    <img class="logo" src="../picture/LogoD10-2021.svg" alt=""/>
    
    </div>
    <nav class="navbar">
      
      <a class="navbar-link" href="../html/page_accueil.html">Accueil</a>
      <a class="navbar-link" href="../html/page_bureau.html">Bureau</a>
      <a class="navbar-link" href="../html/jeux_societe.html">Jeux de société</a>
      <a class="navbar-link" href="../html/jeux_de_role.html">Jeux de Rôle</a>
      <a class="navbar-link" href="../html/event.html">Evènements</a>
    </nav>
    <nav class="navbar">

      <a class="navbar-link" href="../html/event.html" onclick="display_event('future');">A venir</a>
      <a class="navbar-link" href="../html/event.html" onclick="display_event('passed');">Archivés</a>
      <a class="navbar-link" href="calendrier.php">Calendrier</a>

      
     </nav>
  </head>

  <!--La partie calendrier en elle-même-->

  <?php 
  require('date.php');
  $date = new Date();
  $year = date('Y');
  $dates = $date->getAll($year);
  $events = $date->getEvents($year);
  ?>

  <div class="periods">

    <div class="year" style="text-align: center; padding-top: 2rem;padding-bottom: 1rem;">
      
      <?php echo $year?>

    </div>

    <div class="months">
        <ul>
          <?php foreach ($date->months as $id=>$month): ?>

            <li><a href="#link<?php echo $id+1;?>" id="<?php echo $id+1; ?>"><?php echo utf8_encode(substr(utf8_decode($month),0,3))?></a></li>
          <?php endforeach;?>
        </ul>
      </div>
      <div class="clear"></div>
    
    <?php $dates = current($dates);
    foreach ($dates as $m => $days):?>
      <div style="padding-top: 3rem; padding-bottom: 2rem;"><h1 class = "titleMonth" id="link<?php echo $m;?>" style="text-align: center; color: rgb(50,50,50);"><?php echo $date->months[$m-1]; ?></h1></div>
      <div class="month relative" id="month<?php echo $m; ?>"  style="visibility: visible; z-index:0;">
        <table>
          <thead>
            <tr>
              <?php foreach ($date->days as $d): ?>

                  <th><?php echo substr($d,0,3);?></th>

              <?php endforeach;?>
            </tr>
          </thead>


          <tbody>
            <tr>
             <?php $end = end($days); foreach ($days as $d => $w): ?>
              <?php $time = strtotime("$year-$m-$d");?>
              <?php if($d == 1 && ($w != 1)):?>
                <td colspan="<?php echo ($w-1); ?>" class="padding"></td>
              <?php endif; ?>

              <td>
                <div class="relative">
                  <div class="day">
                    <?php echo $d; ?>
                  </div>
                </div>
                <div class="daytitle">
                  
                  <?php echo $date->days[$w-1]; ?>
                  <?php echo $d; ?>
                  <?php echo $date->months[$m-1]; ?>


                </div>
                <ul class="events" id="list_events">
                  <?php if(isset($events[$time])): foreach ($events[$time] as $e) : ?>
                    <li><?php echo $e; ?></li>
                  <?php endforeach; endif; ?>
                </ul>
              </td>

              <?php if($w == 7): ?>
               </tr><tr>
              <?php endif;?>


            <?php endforeach;?>

           </tr>
          </tbody>
        </table>
      </div>

    <?php endforeach;?>
    <?php if($end != 7): ?>
       <td colspan="<?php echo 7-$end; ?>" class="padding"></td>
    <?php endif; ?>

  </div>
  </br>

</body>

<!-- Lien de contact -->
<footer>
    
    <div class="footer">

      <ul style="text-align: center;">

      <li><h3>Nous contacter</h3></li></br>

      <li>E-mail : ...</li></br></br>

      <li>----</li></br></br>

      <li><h3>Nous trouver : </h3></li></br>

      <li><h5>Sur Calais : </h5></li></br>

      <li>Salle A105, A115, A110 ou MDE</li></br>

      <li><h5>Sur Dunkerque : </h5></li></br>

      <li>...</li></br>

      <li><h5>Sur St Omer : </h5></li></br>

      <li>...</li></br></br>

      <li>----</li></br></br>

      <li><h3>Liens utile : </h3></li>

      </ul>

      <div id="icon_1">
        <div class="icon_2" >

          <a href="https://www.facebook.com/d10casse"><i class="fa fa-facebook-square fa-3x social-fb" id="social"></i></a>

        </div>
        <div class="icon_2">

          <a href="https://discord.gg/WqhaFjcuAt"><span class="iconify" data-icon="simple-icons:discord" data-inline="false"></span></a>

        </div>
        <div class="icon_2" >

          <a href="https://www.instagram.com/d10casse/"><span class="iconify" data-icon="simple-icons:instagram" data-inline="false"></span></a>

        </div>

      </div></br></br></br></br>



      

      <p style="text-align: center;">Site mis à jour le 20/07/2021 - 00h14</p></br></br>
      


    </div>

  </footer>


</html>