### 11/07/2022 - Sprint 0 - Jour 1

- Matinée cockpit en groupe pour la présentation de l'apothéose
- Après midi découverte du groupe et du projet
- Beaucoup de discussions autour des fonctionnalités du site et debut du cachier des charges
- Attributions des roles de chacun

### 12/07/2022 - Sprint 0 - Jour 2

- Discussion plus en details sur les fonctionnalités du projet
- Création des user stories individuellement
- Regroupement des user stories sur le cachier des charges
- Discussion et explication sur les wireframes
- Distribution à chacun des wireframes à dessiner individuellement

### 13/07/2022 - Sprint 0 - Jour 3

- Comparaison de nos wireframes fait la veille afin d'en garder les meilleurs idées
- Discussion sur de futurs fonctionnalités
- Prototypage de MCD individuellement
- Comparaison de nos MCD, plusieurs désaccords
- Prévoir des amélioration du MCD, analyse sur la prochaine journée

### 15/07/2022 - Sprint 0 - Jour 4

- mise à jours du MCD
- ajout des routes back, des conventions et des évolutions futures dans les spécifications
- création du dictonnaire de données
- échange avec Jordan de l'état du projet
- création d'un fichier de suivi de veille

### 18/07/2022 - Sprint 0 - Jour 5

- structuration du repo en deux dossier front et back
- amélioration du cahier des charges
- amélioration du MCD
- amélioration du dico de données
- création du MLD
- préparation pour Tino à la présentation du projet pour la rétrospective du lendemain

### 19/07/2022 - Sprint 1 - Jour 6

- matinée retrospective et présentation des projets entre nous
- Tom et Cédric ont discuté et commencer à s'organiser au niveau des composants REACT de base
- Moi, Tino et El Houceine avons initialisé et configuré sqitch et terminé la premiere migration pour créer la base de donnée
- Plusieurs résolution de probleme mineur lié aux installations de certains programmes et terminals

### 20/07/2022 - Sprint 1 - Jour 7

- Initialisation du server express
- Discussion autour de la structure de fichier du serveur
- Configuration du routage du serveur
- Configuration de la connexion du serveur à la base de donnée
- Mise à jour de la base de données, ajout de deux tables
- Mise à jour de la doc avec les nouvelles données
- Ajout du migration en version 2, deploy, revert et verify ok
- Mise à jour du fichier de seeding avec les nouvelles données
- Étude des communs : règles css globales, composants récurrents, ressources graphiques et techniques (images, icônes, fonts)
- Création des 2 composants React communs, Header et Menu (en mode static pour le moment ) qui apparaîtront quelle que soit la vue lorsque l’user est connecté.
- Fix d’un conflit de merge (notre premier !) et fix des variables css globales.

### 22/07/2022 - Sprint 1 - Jour 9

**Tom:**

_Ce que tu as fait hier:_

- Premiers essais JWT.
- Login form front branché sur redux.
- Mise en place des champs contrôlés sur loginForm et de la logique de connexion
  
_Les problèmes rencontrés:_

- Echec avec les CORS, mise en place du middleware coté server pour les gérer
  
_Ce que tu comptes faire aujourd'hui:_

- Logique JWT gestion du token
- Nouveau composant priorité sur la gestion user
- Composants affichés en fonction du role

**Jonathan:**

_Ce que tu as fait hier:_

- JWT, user controller, DB upd to V3
  
_Les problèmes rencontrés:_

- Un peu de veille nécessaire pour comprendre JWT et son fonctionnement
- Problème avec le nommage des noms de colonne, longue réflexion pour décider si on passait en camel case mais      finalement non, pas assez de recul pour savoir si ca poserait encore plus de problèmes

_Ce que tu comptes faire aujourd'hui:_

- Des datamapper et le error handler et le controller wrapper

**Cédric:**

_Ce que tu as fait hier:_

- construction du composant Club (contenu statique et CSS), desktop et mobile
  
_Les problèmes rencontrés:_

- Problème VSC/Eslint : VSC enregistre automatiquement la séquence de fin ligne en LF alors qu'Eslint attend du CRLF
- Solution non trouvée, en attendant je demande à Eslint d'ignorer l'erreur.

_Ce que tu comptes faire aujourd'hui:_

- Composant Club : image-club (logo) à conserver en vue mobile
- Logique du composant Club avec Redux
- Commencer un autre composant

**Augustin:**

_Ce que tu as fait hier:_

- Veille pour découvrir et apprendre le fonctionnement de JWT (Jason Web Token)
- Mise en place de JWT
- Mise en place de la communication entre Front et Back du token.
- Correction des erreurs et refacto du datamapper.
Début de travail sur un controller pour faire des tests, sur ma branche.
_Les problèmes rencontrés:_
- Comprendre comment extraire du token de JWT les informations, pour les manipuler. L’envoi du token entre le front et le back.
_Ce que tu comptes faire aujourd'hui:_
- Finir les datamapper, commencer les controller

**El Houceine:**

_Ce que tu as fait hier:_

- JWT, doc, tuto, video youtube, datammapper (type)
_Les problèmes rencontrés:_
- Faire fonctionner un simple JWT, erreur de syntaxe
_Ce que tu comptes faire aujourd'hui:_
- finir tous les datamapper et commencer les controllers, vérifier qu'on a pas tous casser et vérifier les datamapper d'hier, faire les merge, et delete les branches

### 25/07/2022 - Sprint 1 - Jour 10

**Tom:**

_Ce que tu as fait vendredi:_

- veille pour comprendre le fonctionnement de JWT coté react avec la gestion en local storage.
[lien ici](https://github.com/bezkoder/react-jwt-auth)
Fonctionnement opérationnel pour stockage et recuperation du token.
- finition du composant dashboard static
- Responsive design  global et gestion du state open/close du menu
- Page 404 connectée (ébauche)

_Les problèmes rencontrés:_

- Redirection apres connexion
Recherche sur le redirect en react router v6 : [lien ici](https://blog.openreplay.com/routing-with-react-router-6)
- favicons : Recherche dans la doc de webpack pour gerer les favicons dans le template html

_Ce que tu comptes faire aujourd'hui:_

- Gerer le refresh token (a quel moment ? qu'est ce qu'on recupere ?)
- Composant Profil alimenté par la DB

**Jonathan:**

_Ce que tu as fait vendredi:_

- Terminer le controller "user"
- Terminer la route /logn POST avec le middleware de connexion
- Test de la connexion en le front et le back via la route /login POST
- Création d'un wrapper de controleur pour faire un try and catch global sur chaque controleur
  
_Les problèmes rencontrés:_

- Un peu de réflexion sur les fonctions update et create du controller "user" pour rendre dynamique les parametres d'entrée
- On a eu quelques bugs sur la connexion front et back à cause de fonctions mal nommées
- Un peu de mal avec le controller wrapper et le currying, j'ai fais un peu de veille pour mieux comprendre car la syntaxe en fléché était pas simple à lire avec 3 fonctions imbriquées

_Ce que tu comptes faire aujourd'hui:_

- Participer au déploiement de l'app
- Commencer le error handler, en espérant le terminer
- Vérifier la connexion token et faire la partie refresh

**Cédric:**

_Ce que tu as fait vendredi:_

- construction des composants Members et Help (contenu statique et CSS)

_Les problèmes rencontrés:_

- trouver les solutions CSS pour obtenir le rendu désiré

_Ce que tu comptes faire aujourd'hui:_

- Participer au déploiement de l'app
- rendre dynamique les composants (champs contrôlés, etc...)

**Agustin:**

_Ce que tu as fait vendredi:_

- J'ai terminé les derniers datamappers qui me restaient à faire.
- Veuille pour pouvoir installer JEST et premiers tests

_Les problèmes rencontrés:_

- Determiner quel est les resultat esperé pour configurer correctement le test

_Ce que tu comptes faire aujourd'hui:_

- Finalisation de quelques test avec JEST
- Les controleurs qui restent à faire
- Reflexion sur la mise en place d'un fichier unique pour la gestion des erreurs
- Essai de la reflexion sur le deploiement Heroku et tests

### 27/07/2022 - Sprint 2 - Jour 12

**Tom:**

_Ce que tu as fait hier:_

- creation de reducer et de middlewares
- recherche sur format de date (mdn)
- recherche sur refresh token
- refactor des middlewares et mise en place d'un fichier de config global
- preparation retropspective sprint 1
- reflexion sur la logique is loading
- logique dans divers composants
- composant add user

_Les problèmes rencontrés:_

- mise a jour coté back (avec new module) du coup serveur plante et pas facile de savoir pourquoi ^^
- Probleme avec le refresh token et sa logique.
- axios et le url form encoded
- utiliser la librairie qs

_Ce que tu comptes faire aujourd'hui:_

- assister à la retro
- terminer le form de création de user avec les vérifs
- mettre en place les toasts (notifications visuelles utilisateur)

**Jonathan:**

_Ce que tu as fait hier:_

- Présentation de la partie back à la rétrospective
- Implémentation d'un error handler avec surcharge de la classe Error
- Ajoute de la gestion d'erreur, vérification, amélioration des controllers et datamapper

_Les problèmes rencontrés:_

- Un petit peu de veille sur le error handler car ca faisait un petit moment que j'avais pas toucher les classes

_Ce que tu comptes faire aujourd'hui:_

- Vérifier les données en base de données, ajouter les contraintes manquantes
- Implémenter JSDoc pour pouvoir documenter nos route
- Ajouter les routes manquantes pour le front
- Commencer à réflechir et à implementer des algos pour l'insciption et la création de tournoi

**Cédric:**

_Ce que tu as fait hier:_

- préparation et presentation sprint 1 front
- installation Sqitch
- build du composant Loader
- build en cours de la page profil d'un Membre
- logique de la page liste des Membres
- Design de divers composants

_Les problèmes rencontrés:_88

- boucle infinie due au isLoading => pd de logique
- pb d'accès à la BDD, bug psql => réinstallation de psql
- difficultés de compréhension avec Redux 

_Ce que tu comptes faire aujourd'hui:_

- continuer la logique de la page profil d'un Membre 

**Agustin:**

_Ce que tu as fait hier:_

- Retrosprective où il est presenté l'avancement des projets aux autres groupes.
- Correction de deux datamappers pour les adapter aux besoin de l'app.
- Veuille sur joi pour l'implementation de la validation des données.
- Creation des schemas de joi.
- Modification des routers pour ajout de middleware pour joi.
- Test de tout ce qui a été realisé, par Postman.

_Les problèmes rencontrés:_

- Apprendre a utiliser joi et reussir a lui passer les schemas avec les informations correctes

_Ce que tu comptes faire aujourd'hui:_

- Terminer les schemas de joi qui manquent
- Retour sur la BDD pour verifier si elle correspond toujours aux besoins de l'app
- Veille pour la gestion des erreurs

et d'apo groupe par groupe, puis 
_Les problèmes rencontrés:_
jveAtatin prMuradatamapper, controller, schema, router **El Houceine:**

_Ce que tu as fait hier:_

- datamapper, controller, router, schema avec TEST concluant

_Les problèmes rencontrés:_

- des erreurs à la c** 

_Ce que tu comptes faire aujourd'hui:_

- poursuivres et finir ce qu'il reste à faire, et voir ce qui peut être fait

### 28/07/2022 - Sprint 2 - Jour 13

**Tom:**

_Ce que tu as fait hier:_

- form add user complet-
- fontion pour delete des keys inutiles dans le json envoyé a l'api
- recherche : pourquoi une valeur null par defaut dans le state (sur une valeur non numerique) bloque le render de React ?
- ajout des messages toasts
- recherche sur le dismount d'un composant en timeout
- veille pour error joi en fr
- veille sur l'animation dans React (framer, react-transition)

_Les problèmes rencontrés:_

- poster de la data compatible avec l'api
- animation dans react

_Ce que tu comptes faire aujourd'hui:_

- commencer les composants de gestion tournament
- reflexion algo

**Jonathan:**

_Ce que tu as fait hier:_

- Verifications et mise à jour de la DB
- Amélioration du déploiement
- Implémentation d'un gestionnaire de mail avec template HTML

_Les problèmes rencontrés:_

- J'ai toujours du mal à déployer, il me faut transformer le repo actuel en déplacant les fichiers serveurs à la racine et ca met le bazar sur git. J'ai eu aussi plusieurs probleme en créant le mail handler, des problemes d'email bloqué pour spam et aussi des bug de configuration en essayant de passer par de addons qui finalement était inutile.

_Ce que tu comptes faire aujourd'hui:_

- Etudier les besoins au niveau des routes complexes
- Réflechir aux algo de création de tournois
- Voir la Doc swagger

**Cédric:**

_Ce que tu as fait hier:_

- composant Member : logique qui permet d'afficher le profil d'un membre
- Design composants Club, Members, Member
- Logique composant Club (reducer, middleware...)

_Les problèmes rencontrés:_

- problème de récupération des données d'un menbre due au state initial => il ne fallait pas mettre 'null'
- il faut probablement utiliser le state initial 'null' uniquement pour les valeurs numériques.

_Ce que tu comptes faire aujourd'hui:_

- champs controlé "recherche d'un membre" dans le composant Members
- composant Members : affichage conditionnel (uniquement si user = admin) du bouton 'ajouter un membre'
- composant Members : afficher seulement les 'is_active'

**Agustin:**

_Ce que tu as fait hier:_

- Révision de tous les controllers et datamappers : correction des erreurs et des incohérences de syntaxe
- Utilisation de PGAdmin pour rechecker toute la BDD et apporter les modifications nécessaires.
- Creation d’un nouveau deploy sur sqitch pour mettre à jour la BDD
- Veille pour réussir à valider avec regex, sur postgres, un champ avec datatype integer. Je n’ai pas réussi à trouver la solution : décision de laisser le champ en question en integer.


_Les problèmes rencontrés:_

- Avec joi les champs vides qui viennent du front ne passent pas la validation. Nous avons le message d’erreur "must not be empty" Nous ajoutons allow("").
- Erreur quand j’essaie de changer le datatype de text a integer, sur la BDD. L’erreur était provoquée par une contrainte, qu’il a fallu enlever avant de faire le changement. 
- Problème pour faire fonctionner la regex de validation d’un champ number sur la BDD que j’ai pas réussie a résoudre.

_Ce que tu comptes faire aujourd'hui:_

- Personnalisation des messages d'erreur sur joi
- Reflexion sur la creation des routes complexes

**Houceine**

_Ce que tu as fait hier:_

- Controller, datamapper, router, schema, on été fini normalement, V4 revert, swagger-doc, implementation dans certains router

_Les problèmes rencontrés:_

- V4 revert "SET DEFAULT NULL", "DROP NOT NULL", "SET DEFAULT FALSE"
- Swagger-doc, implémentation de la doc, et des erreurs dans la creation, l'update, et le delete sur swagger
- CREATE=> {
  "code": 400,
  "name": "SyntaxError",
  "message": "Unexpected number in JSON at position 62"
}
- DELETE => "code": 500,
            "name": "Internal-Error",
            "message": "UPDATE ou DELETE sur la table « user » viole la contrainte de clé étrangère « team_has_user_user_id_fkey » de la table « team_has_user »"

_Ce que tu comptes faire aujourd'hui:_

- Faire tous les router avec la doc swagger, et voir le problème CREATE, UPDATE DELETE

### 29/07/2022 - Sprint 2 - Jour 14

**Tom:**

_Ce que tu as fait hier:_

- Note : route api user : renvoyer le mot de passe ?
- Branchement du dashboard sur la db.
- travail sur le composant TournamentCard
- Ajout du reducer et middleware tournament.
- Ajout de fonction de conversion en texte des genres/discipline/tournament state
- Reflexion sur la maniere de recevoir les stats, gestion des stats ? ajout de champ en db, tournament winner ?
- tentative de déploiement sur hebergeur non géré en github. raté.

_Les problèmes rencontrés:_

- tri sur tableau d'objet
- comment traiter les réponses api (gestion des data sous forme d'id)

_Ce que tu comptes faire aujourd'hui:_

- avancer sur ce qui touche a tournament

**Jonathan:**

_Ce que tu as fait hier:_

- On a échangé avec l'équipe sur les routes qu'il nous restait à faire
- J'ai fais un datamapper et controller stat, avec une grosse requete qui nous renvoie toutes les stats d'un joueur
- Correction d'une PR avec des conflits qui m'a pris un peu de temps

_Les problèmes rencontrés:_

- Les conflits de merge, il y en a de plus en plus
- La requete SQL, un peu eu du mal au départ avec les sous requetes, j'ai du fair eun peu de veille pour me rappeler de quelques notions

_Ce que tu comptes faire aujourd'hui:_

- Des routes complexes
- update la doc swagger
- Algo de tournois et inscription

**Cédric:**

_Ce que tu as fait hier:_

- logique du composant Club
- Gestion du champs de recherche d'un membre (composant Members)
- Afficher le bouton "Ajouter un membre" seulement si l'utilisateur est Admin
- Design divers

_Les problèmes rencontrés:_

- intégrer une icone dans un input
- logique Redux...

_Ce que tu comptes faire aujourd'hui:_

- trier par ordre alphabétique la liste des membres
- gérer l'affichage de la liste des membres actifs
- ??? à voir selon les priorités

**Agustin:**

_Ce que tu as fait hier:_

- Creation des routes supplementaires pour recuperer des informations des differentes tables
- Modification des routers, controllers et datamappers pour faire functionner les nouvelles routes
- Creation des requëtes et functions necessaires pour obtenir les informations necessaires pour les nouvelles routes

_Les problèmes rencontrés:_

- Comprenhension du functionnement des differentes tables et les interactions entre elles
- Savoir à partir de quel contexte effectuer les requetes
- Syntaxe des routes pour rester coherent

_Ce que tu comptes faire aujourd'hui:_

- Finalisation des routes restantes à faire
- Veuille sur swagger 

**Houceine**

_Ce que tu as fait hier:_

- swagger-doc sur tous les routers
- ORDER BY ajouter sur les findAll dans tous les datamapper

_Les problèmes rencontrés:_
 
- dans swagger-doc, j'ai mis "tag" au lieu de "tags" dans la doc, et problème de rangement dans le visuel
- pas fonctionnelle à 100% quelques erreur lors des test PATCHS et CREATE notamment sur swagger
- ajout de la colonne "winner_ido - ORDER BY ajouter en sur les f"indAll dans tous lesORDER BY ajouter en sur les findAll dans tous les swagger-doc sur tous les routers, pas fonctionnelle à 100% quelques erreur lors des test PATCHS et CREATE notamment

_Ce que tu comptes faire aujourd'hui:_

-ajouter une colonne slug
-ajouter colonne winner_id

### 29/07/2022 - Sprint 2 - Jour 14

**Tom:**

_Ce que tu as fait vendredi:_

- Add tournament Form
- Gestion de la date dans le champ controlé date (formatage spécifique )
- Gestion d'une chexbox en champ controlé
- input file preview avec js `(URL.createObjectURL(evt.target.files[0])`
- pas évident le design de l'input file (CSS) `input[type="file"]::-webkit-file-upload-button`
- déploiement semi manuel chez o2switch.
- Recherches sur l'algo de création de tournoi all vs all

_Les problèmes rencontrés:_

- comment changer d'url au submit (apres un succes sur un async) 
--> dispatcher une action au submit (REDIRECT), dans le reducer alimenter le state correspondant, de retour dans le composant verifier ce state et rediriger avec navigate si nécéssaire.
- gestion des CSP (CONTENT POLICY MANAGEMENT un peu comme les CORS)
- Helmet a configurer (bloque les images distantes)
- Probleme ssl chez l'hebergeur

_Ce que tu comptes faire aujourd'hui:_

- Algo Creation de tournoi
- composant Tournament


**Jonathan:**

_Ce que tu as fait vendredi:_

- Mise a jour des controller et datamapper match et team
- Amélioration du déploiement en une ligne de commande sur heroku
- Améliorations des schema joi et des messages d'erreur
- Ajout de fichier match et team pour REST Client
- Amélioration des message d'erreurs en mode dev
- Update de la DB

_Les problèmes rencontrés:_

- Beaucoup de reflexion pour bien identifier les besoin dans les datamapper et controller avec les tables d'associations
- Un peu difficile de trouver de bonne infos pour le déploiement mono repo sur heroku

_Ce que tu comptes faire aujourd'hui:_

- Améliorer les routes team et tournament pour qu'elle prennent en compte les tables d'associations.
- Check toutes les routes pour etre sur qu'on a tout ce dont on a besoin cote front
- Modifier la DB pour mettre en CASCADE certaine FK au DELETE

**Cédric:**

_Ce que tu as fait vendredi:_

- trier par ordre alphabétique la liste des membres
- format (affichage) des numéros de téléphone
- concerver la recherche dans le champ de recherche d'un membre
- commencer le composant UpdateProfil

_Les problèmes rencontrés:_
 
- redux

_Ce que tu comptes faire aujourd'hui:_

- composant UpdateProfil
- composant Members : effacer la saisie avec un bouton

**Agustin:**

_Ce que tu as fait vendredi:_

- Veuille sur swagger mais aucune mise en pratique.
- Travaille sur les datamappers pour  chercher des reqêtes plus complexes

_Les problèmes rencontrés:_

- La complexité de nos tables. Malgré le MCD ou le MLD je melange encore les functions de chaque table.
- Lesj requêtes imbriquées me donnent des erreurs, surtout dans les "FROM" imbriqués.

_Ce que tu comptes faire aujourd'hui:_

- Réussir les requêtes imbriquées et finir les datamapper restants

**Houceine**

_Ce que tu as fait vendredi:_

- en v1 au lieu de le mettre en V4V, trop comp
- ajout de la colonne slug et winner_id

_Les problèmes rencontrés:_

- amis en V1 u lieu de le mettre en V4, trop compliquer, j'ai pas réussi, et on est limiter par le temps

_Ce que tu comptes faire aujourd'hui:_

- je suis dispo
- 