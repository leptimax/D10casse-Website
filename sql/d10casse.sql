-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 26 juin 2022 à 14:31
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `d10casse`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`ID`, `username`, `password`) VALUES
(1, 'Leptimax', '123');

-- --------------------------------------------------------

--
-- Structure de la table `board_games`
--

DROP TABLE IF EXISTS `board_games`;
CREATE TABLE IF NOT EXISTS `board_games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `nb_players` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `rule` varchar(250) NOT NULL,
  `link` varchar(250) NOT NULL,
  `picture` varchar(250) NOT NULL,
  `complete_description` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `nb_players_min` int(11) NOT NULL,
  `nb_players_max` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `board_games`
--

INSERT INTO `board_games` (`id`, `name`, `nb_players`, `description`, `rule`, `link`, `picture`, `complete_description`, `location`, `nb_players_min`, `nb_players_max`) VALUES
(1, 'Exploding kitten', '2 à 9 joueurs', 'Le jeu de la roulette russe revisité avec ... des chats (et des cartes) !\n', 'http://jeuxstrategie1.free.fr/jeu_exploding_kittens/regle.pdf', 'www.explosingkittens.com/how', '../picture/exploding_kittens.png', 'Exploding Kittens revisite la célèbre Roulette Russe dans un jeu de cartes où les chatons côtoient d’un peu trop près grenades, missiles nucléaires et torpilles dans un cocktail détonant ! \n\nÀ tour de rôle, les joueurs piochent des cartes du paquet jusqu’à ce qu’un joueur révèle un chaton explosif, provoquant sa mort et sa défaite pour la partie en cours. \nLes autres cartes permettent aux joueurs de se protéger des déflagrations, de forcer les autres à piocher plus ou à regarder les prochaines cartes avant de remélanger le tout. \nLe joueur qui a réussi à éviter toutes les explosions remporte la partie !', 'Calais', 2, 9),
(2, 'Le Poker des Cafards', '2 à 6 joueurs', 'Le jeu qui ne vous donnera pas ... le cafard !', 'https://www.gigamic.com/files/catalog/products/rules/gigamic-poker-cafards-rules-fr-bdef.pdf', 'https://youtu.be/PmBM_TeQdUA', '../picture/poker_cafard.jpg', 'Le Poker des Cafards est un jeu de cartes pour amateurs de jeux d\'ambiance, simples et légers.\n\nAvec des règles expliquées en quelques secondes, ce jeu dynamique et rigolo consiste à se refiler des cartes animaux (Cafards, crapauds etc.) en évitant de se retrouvant avec une collection de 4 animaux identiques.\n\nAvec des parties rapides, et un thème propice à la rigolade, \"Le Poker des Cafards\" est un petit jeu d\'apéro basé sur le bluff.\n\nLe but : ne pas perdre et donc éviter d\'accumuler devant soi 4 cartes d\'animaux identiques.', 'Calais', 2, 6),
(3, 'Imploding Kitten', '2 à 6 joueurs', 'La première extension d\'Exploding Kitten', 'https://ek.explodingkittens.com/downloads/rules/translations/Imploding-Kittens_Rules_FR.pdf', 'http://www.explodingkittens.com/how', '../picture/imploding_kittens.jpg', 'Imploding Kittens c\'est 20 nouvelles cartes implosives, toujours illustrées par The Oatmeal, qui vous permettront enfin de jouer à 6. Avec 6 joueurs autour de la table, il est probable que certains aient du mal à suivre, pas de panique les créateurs ont pensé à vous et ajouté aussi une Collerette de la honte à taille humain pour indiquer le sens du jeu (enfin si vous ne portez pas vous même la collerette...)', 'Calais', 2, 6),
(4, 'Crossing', '3 à 6 joueurs', 'Le jeu qui réveillera l\'avare en chacun de vous !', 'http://jeuxstrategie1.free.fr/jeu_crossing/regle.pdf', 'https://youtu.be/WNsFSOfPB7U', '../picture/crossing.jpg', 'Bluffez et rusez pour amasser plus de pierres précieuses que vos adversaires. Pointez du doigt celles que vous désirez et prenez-les si vous êtes seul à les viser. Mais ne soyez pas trop gourmand et protégez-vous à temps de vos adversaires. Un jeu simple, rapide et drôle.', 'Calais', 3, 6),
(5, 'Welcome to the Dungeon', '2 à 4 joueurs', 'Serez-vous assez téméraire pour vous enfoncer dans le donjon ?', 'https://www.iello.fr/regles/WTTD_regles_FR.pdf', 'https://www.youtube.com/watch?v=L9cYBG6SIMQ', '../picture/welcome_to_the_dungeon.jpg', 'Vous êtes tous à l’entrée du donjon, mais un seul d’entre vous peut entrer : le plus brave, le plus fou, ou celui qui n’a pas eu la chance de fuir ! Pour le déterminer, vous allez à chaque tour réduire votre équipement ou ajouter des monstres à affronter à l’intérieur. Serez-vous assez téméraire pour vous enfoncer dans le donjon ou laisserez-vous passer vos adversaire devant en espérant ne jamais les voir ressortir ?\n\nDans Welcome to the Dungeon, tous les joueurs jouent avec le même héros, et tentent d\'être celui qui l\'entraînera dans les profondeurs du donjon en quête de trésors et de gloire. Placez l\'Aventurier, objet de toutes vos convoitises, au centre de la table, avec les 6 armes et protections qui composent son équipement pour affronter les Monstres qui peuplent le Donjon.', 'Calais', 2, 4),
(6, 'Welcome Back to dungeon', '2 à 4 joueurs', 'Le donjon rouvre à nouveau ses portes, oserez-vous vous y aventurez ?', 'https://cdn.1j1ju.com/medias/cd/1b/3b-welcome-back-to-the-dungeon-regle.pdf', 'https://www.youtube.com/watch?v=RSKoqn_36GQ', '../picture/welcome_back_to_dungeon.jpg', 'De retour dans le donjon...\n\nDepuis que 4 inconscients se sont essayés à entrer dans le terrible Donjon du bois Sans Retour, l’histoire a fait le tour du royaume. Nombreux sont alors les fous qui ont voulu reproduire cet exploit, sans jamais en ressortir vivants… enfin, jusqu’à aujourd’hui ! 4 nouveaux aventuriers se dressent face à ce donjon, dont la réputation fait trembler dans les chaumières ! Fiers, fous ou courageux, ils sont bien décidés à en découdre avec les habitants de ce terrible lieu… ou peut-être pas tant que ça, finalement ! Ce qu’ils ignorent, c’est que de nouveaux monstres encore plus puissants ont fait leur apparition et ont faim … Très faim !', 'Calais', 2, 4),
(7, 'Time Bomb', '4 à 8 joueurs', 'Arriverez-vous à désamorcez la bombe et sauver Big Ben ?', 'https://www.play-in.com/pdf/rules_games/time_bomb_regles_fr.pdf', 'https://www.youtube.com/watch?v=nC8zADHfaNM', '../picture/time_bomb.jpg', 'Big Ben surplombe la charmante ville de Londres tandis qu’elle cache, sous son tic-tac régulier, le son de la bombe posée par Moriarty . C’est alors que Sherlock se précipite vers la grande tour pour tenter de la désamorcer ! Aiderez-vous Sherlock à désamorcer la bombe et sauvez Big Ben ? Ou assisterez-vous plutôt Moriarty dans son plan machiavélique ? Lancez-vous dans une partie pour le découvrir !', 'Calais', 4, 8),
(8, 'Pandemic', '2 à 4 joueurs', 'Quatre maladies mortelles menacent l’avenir de la planète! Avec votre équipe : combattez les redoutables virus !', 'https://cdn.1j1ju.com/medias/f8/5d/96-pandemic-regle.pdf', 'https://www.youtube.com/watch?v=R0Qcma3g9JI', '../picture/pandemic.png', 'Vous et vos compagnons faites partie d’une équipe d’élite combattant quatre maladies mortelles.</br>\nVotre équipe fera le tour du monde pour entraver la propagation des maladies et développer les ressources\nnécessaires pour découvrir les remèdes. Vous devrez coopérer et tirer profit de vos forces individuelles afin de\ncontenir les maladies avant qu’elles n’affligent le monde entier.</br>\nLe temps presse : épidémies et éclosions accélèrent la propagation du fléau. Trouverez-vous les remèdes à\ntemps ? Le destin de l’humanité est entre vos mains !', 'Calais', 2, 4),
(9, '7Wonders', '3 à 7 joueurs', 'L\'Antiquité et ses merveilles. Revivez l\'épopée des grandes constructions avec ce jeu de cartes et de stratégie !', 'https://www.jeuxavolonte.asso.fr/regles/7_wonders.pdf', 'https://www.youtube.com/watch?v=0VU6lGR95X0', '../picture/7wonders.png', 'Prenez la tête de l’une des sept grandes cités du monde Antique.</br>\nExploitez les ressources naturelles de vos terres, participez à la marche\nen avant du progrès, développez vos relations commerciales et affirmez\nvotre suprématie militaire.</br>\nLaissez votre empreinte dans l’histoire des civilisations en bâtissant une\nmerveille architecturale qui transcendera les temps futurs.', 'Calais', 3, 7),
(10, 'Mysterium', '2 à 7 joueurs', 'Mysterium est un jeu d’enquête coopératif dans lequel tous les joueurs sont unis dans un même but : découvrir la vérité sur la mort du fantôme qui hante le manoir et lui apporter la paix !', 'https://www.delijeux.com/sites/default/files/file_gamerule/mysterium-regle-jeu-2015-libellud.pdf', 'https://www.youtube.com/watch?v=Or13pbEfy6I', '../picture/mysterium.jpg', 'M. MacDowell, astrologue doué, a détecté la présence d\'un être surnaturel en entrant dans sa nouvelle maison en Écosse. Il a réuni d\'éminents médiums pour une séance extraordinaire. Ces derniers ont sept heures pour contacter le fantôme et enquêter sur son assassinat. Malheureusement, le fantôme est amnésique et ne peut communiquer avec les médiums que par le biais de visions, qui sont représentées dans le jeu par des cartes illustrées. Les médiums doivent déchiffrer les images pour aider le fantôme à se rappeler du drame : Qui a commis le crime ? Où s\'est-il déroulé ? Quelle arme a causé la mort ? Plus les médiums coopèrent et devinent bien, plus il est facile d\'attraper le bon coupable.', 'Calais', 2, 7);

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(255) NOT NULL,
  `date_event` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `title`, `description`, `picture`, `date_event`) VALUES
(1, 'Test', 'Ceci est un évènement test pour vérifier que tout fonctionne parfaitement. L\'auteur de ce test est moi-même', '../picture/warhammer40k.jpg', '2021-06-01'),
(2, 'Test 2', 'un nouveau test pour vérifier que l\'ensemble du système fonctionne parfaitement', '../picture/exploding_kittens.jpg', '2021-06-30'),
(3, 'test4', 'test', '../picture/macadabre.jpg', '2021-07-23');

-- --------------------------------------------------------

--
-- Structure de la table `rpg`
--

DROP TABLE IF EXISTS `rpg`;
CREATE TABLE IF NOT EXISTS `rpg` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `rule_book` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `rpg`
--

INSERT INTO `rpg` (`id`, `title`, `picture`, `description`, `rule_book`) VALUES
(1, 'Sombre', '../picture/sombre.jpg', 'La peur comme au cinéma est un jeu d’horreur contemporain. Il met en scène des antihéros qui essaient de survivre dans un monde particulièrement violent et hostile. L’univers de jeu proposé est celui des films d’horreur, soit un monde contemporain particulièrement dur où fous dangereux et maniaques du découpage de viande humaine sont légion.\n            ', 'file/sombre.zip'),
(2, 'Macadabre', '../picture/macadabre.jpg', 'En l’an 1366, en plein obscurantisme moyenâgeux, la province de Saint-Voile est ravagée par une étrange pestilence transformant sa population en créatures dégénérées, déviantes et bestiales.</br>Si la province, pauvre et bien trop éloignée de la capitale, n’intéresse pas la Couronne ; la fuite de la population face à une épidémie en pleine propagation, les rumeurs d’une nouvelle religion se développant dans la région, l’anathème de l’Église sur la cité fortifiée dirigée par la sulfureuse Comtesse et l’absence de communications avec cette dernière contraignent le roi à mandater un collège de médecins de peste. Le but de cette brigade méprisée : éradiquer la source de cette malemort ou mourir en essayant.</br></br> Macadabre est un jeu de rôle médiéval-fantastique sombre et horrifique pour adultes consentants appréciant l’outrance et le sang. C’est une expérience old-school et extrême aux règles injustes et cruelles où 1 à 12 Docteurs, n’ayant pas peur de violenter leurs habitudes de joueurs, explorent une province et affrontent des bestes en risquant leurs âmes et leurs vies.\n            ', ''),
(3, 'Patient 13', '../picture/patient13.jpg', 'Amnésiques, les personnages se réveillent dans l\'hôpital sans en connaître les raisons et sans pouvoir le quitter. Les Blouses blanches se montrent aussi apathiques qu\'antipathiques, les Supérieurs aussi conspirateurs que sadiques et les autres patients aussi sains que dérangés. Des événements étranges agitent les lieux, les couloirs sont sans fins, les murs et les insectes parlent et, durant la loterie, gare à ne pas tirer le numéro 13...</br></br> Patient 13, c’est un jeu de rôle contemporain...-fantastique pour certains, -psychotique pour d\'autres.</br> C’est un hallucinant huis-clos à l’échelle d’un jeu; un univers cloisonné et pourtant ouvert comme aucun autre; un décor effrayant et déglingué, organique et glacé; mais c’est avant tout une expérience à lire, à vivre et à jouer.\n            ', ''),
(4, 'Naheulbeuk', '../picture/naheulbeuk.jpg', 'Le JDR qui ne se présente plus. Se déroulant dans un univers médiéval fantaisie, il s\'agit de l\'un des JDR possédant le plus grand nombre de scénario et d\'adepte à ce jour.\n            ', ''),
(5, 'La nuit des chasseurs', '../picture/la_nuit_des_chasseurs.jpg', 'En 1883, un trésor de guerre inestimable disparaît dans des circonstances étranges dans la petite ville de Desolation, Texas.</br> 5 ans plus tard, après avoir tué un groupe de marshals qui se rendaient en ville, une bande de hors-la-loi endosse l’identité des hommes de loi pour retrouver le magot.</br> Cette bande, ce sont vos personnages.</br></br> Malheureusement, les lieux cachent plus d’un secret et la plupart sont mortels : des prostituées disparaissent, d’étranges corbeaux attaquent à la nuit tombée et la région est victime des attaques d’un gang sanguinaire – des événements auxquels vous allez devoir vous intéresser pour assurer vos couvertures, tout en cherchant le légendaire Cercueil Noir…</br></br> La Nuit des Chasseurs, c’est du western crépusculaire mais pas que. Quelques gueules cassées, des bizarreries, un décor à la lisière du fantastique (sans pour autant tomber dedans) et pas mal de pistes à suivre et intrigues à développer.\n            ', ''),
(6, 'L\'appel de Cthulhu', '../picture/cthulhu.jpg', 'L\'Appel de Cthulhu, au même titre que des jeux comme AD&D, est un grand classique du jeu de rôles. Tiré des romans d\'épouvante de l\'auteur américain H.P. Lovecraft (1890-1937), il décrit un monde du début du siècle ou rien n\'est ce qu\'il paraît, et où des créatures monstrueuses et des divinités oubliées attendent bien cachées qu\'un inconscient les tire de leur sommeil.</br></br>Le nom du jeu est tiré d\'une de ces divinités : le grand Cthulhu qui dort dans R\'lyeh la cité engloutie, et attend patiemment son réveil. Dans les romans de Lovecraft, les héros sont toujours des gens \\\"ordinaires\\\" confrontés subitement à des choses qui défient la réalité : brèche sur un autre monde, créatures indicibles et démoniaques, morts inexpliquées... L\'issue est d\'ailleurs bien souvent fatale, et si le héros n\'y laisse pas la vie, il y laissera sûrement sa santé mentale.</br></br>Il en va de même avec le jeu de rôle, puisque les personnages jouent des investigateurs, originellement dans les années 20 aux USA - pleine époque de prohibition - mais il est techniquement possible de jouer à n\'importe quel moment de ce siècle. Des alternatives sont proposées pour l\'Angleterre victorienne, le Paris des années folles, l\'époque contemporaine, ou même l\'ambiance X-Files (avec Delta Green). Quelle que soit l\'époque, ces investigateurs seront justement confrontés à des créatures sans nom : enquêtes, intrigues, et épouvante sont au rendez-vous de ce jeu qui s\'imposera auprès des joueurs avec son style unique en son genre. Il déclenchera même un regain d\'intérêt pour les romans de H.P. Lovecraft.\n            ', ''),
(7, 'Warhammer 40 000', '../picture/warhammer40k.jpg', 'Warhammer 40k, basé sur l\'univers éponyme créé par Games Workshop, se déroule dans le 41ème millénaire. L\'humanité a grandement évolué, ayant conquis les deux tiers de la galaxie, elle se retrouve aujourd\'hui déchirée dans des guerres contre des races extraterrestres, mais également contre elle-même. En effet, suite à la grande hérésie d\'Horus, les dieux du chaos ne cessent de gagner en puissance et corrompent de plus en plus d\'humain.</br></br>Les joueurs ont la possibilité de jouer des humains, allant du soldat basique au space marine, mais également des races extraterrestres telles que les Eldars ou les Tau et auront pour mission de protéger l\'Impérium de l\'humanité contre toutes les menaces qui pèsent dessus.', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
