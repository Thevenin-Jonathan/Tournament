# DEFINITION PROJET TOURNAMENT

## Cahier des charges

- [DEFINITION PROJET TOURNAMENT](#definition-projet-tournament)
  - [Cahier des charges](#cahier-des-charges)
  - [Présentation du projet](#présentation-du-projet)
    - [Cible du projet](#cible-du-projet)
  - [Attribution des roles de l'équipe](#attribution-des-roles-de-léquipe)
  - [Les technologies utilisées](#les-technologies-utilisées)
  - [Les navigateurs compatibles](#les-navigateurs-compatibles)
  - [Arborescence](#arborescence)
  - [Routes](#routes)
    - [Back](#back)
    - [Front](#front)
  - [Les roles utilisateurs](#les-roles-utilisateurs)
  - [Les fonctionnalités](#les-fonctionnalités)
    - [MVP](#mvp)
    - [Évolutions futures](#évolutions-futures)
  - [Use Cases](#use-cases)
  - [Liste des pages](#liste-des-pages)
  - [Conventions](#conventions)
  - [Wireframes](#wireframes)

## Présentation du projet

L'organisation d'un tournoi de sport et plus spécifiquement dans le cadre du Badminton:(ou Tennis) est toujours fastidieuse.
Entre gérer les tableaux/catégories (jeunes, double, mixte, simple), les inscriptions, la composition, le type de tournoi (all-play-all, poules, élimination directe), les passages, les terrains...
Cela demande beaucoup de préparation et de gestion technique pour un club qui veut proposer des tournois amicaux ! (les tournois dans le cadre de la fédération disposent de leurs propres outils).
Souvent ça se termine en tableau Excel, au mieux, et la plupart du temps au Velléda sur le bord du gymnase, avec un bon mal de crane pour essayer d'optimiser un minimum et pas finir à 2h du matin :)
Notre objectif est de proposer un outil clé en main pour organiser facilement ces évènements.

### Cible du projet

Le service cible les clubs de badminton.
Les utilisateurs seront les gestionnaires de club et les adhérents du club.

## Attribution des roles de l'équipe

- Tom Roche : Product Owner
- Jonathan Thevenin : Scrum master
- Cédric Bernard : Lead dev front
- Augustin Pajaro : Lead dev back
- El Houceine El Handouz : Git Master  

## Les technologies utilisées

- Back :
  - NodeJS, Express, Postgresql, Swagger, Sqitch
- Front :
  - HTML, CSS, SASS, JS, React, Redux

## Les navigateurs compatibles

- Chrome
- Firefox
- Safari
- Opera
- Edge

## Arborescence

[Lien vers le gloomaps](https://www.gloomaps.com/YsdgTyfRa3)

📄home\
 ┣ 📄connexion\
 ┃  ┣ 📄dashboard\
 ┃  ┃  ┣ 📄tournois\
 ┃  ┃  ┃  ┣ 📄création d'un tournoi\
 ┃  ┃  ┃  ┗ 📄details d'un tournoi\
 ┃  ┃  ┣ 📄club\
 ┃  ┃  ┣ 📄membres\
 ┃  ┃  ┃  ┗ 📄création d'un membre\
 ┃  ┃  ┃  ┗ 📄details d'un membre\
 ┃  ┃  ┣ 📄classements\
 ┃  ┃  ┣ 📄profil\
 ┃  ┃  ┣ 📄aide\
 ┃  ┃  ┗ 📄404\
 ┃  ┗ 📄mot de passe perdu\
 ┣ 📄contact\
 ┣ 📄à propos\
 ┣ 📄mentions légales\
 ┗ 📄404

## Routes

### Back

| Route | Méthode | Action | Données renvoyées |
| --- | --- | --- | --- |
| /login | GET | affiche la page de connexion | affiche la page
| /login | POST | nous connecte ou non| renvoi la page
| /api/tournament | GET | Récupère la liste des tournois | Liste des tournois
| /api/tournament | POST | Ajouter/creer un nouveau tournoi | Tournoi créée
| /api/tournament/:id | PATCH | Modifie un tournoi| Tournoi modifier
| /api/tournament/:id | DELETE | Supprime un tournoi | Aucune donnée renvoyée
| /api/tournament/:id/match | GET | Récupére tous les matchs | renvoi les matchs donné
| /api/tournament/:id/match/:id | PATCH | mettre à jour le match | renvoi un match à jour
| /api/tournament/:id/team/ | GET | récuperer toutes les teams d'un tournoi | renvoi les teams du tournoi avec ces joueurs
| /api/tournament/:id/team/:id | PATCH | mettre à jour une team| renvoi une team modifié
| /api/tournament/:id/team/:id/match | GET | récupere tous les matchs d'une team | renvoi les matchs d'une team
| /api/user| GET | Recupèrer la liste des membres | Liste des membres
| /api/user | POST | Ajouter un membre | Membre crée
| /api/user/:id | PATCH | Modifie un membre | Membre modifier
| /api/user/:id | DELETE | Supprime un membre | Aucune donnée renvoyée
| /api/user/:id/match | GET | récupére tous les matchs avec la table PLAY
| /404 | GET | redirige vers la page 404 | renvoi une 404
| /contact | GET | redirige vers la page contact | renvoi une page contact
| /contact | POST | soumettre le formulaire | renvoi le formulaire

### Front

| Route | Action |
| --- | --- |
| / | Affiche la page promo du site ? route back statique
| /connexion | Affiche la page de connexion
| /mot-de-passe-perdu | Permet de récuprer son mot de passe
| /contact | Permet d'envoyer un message personnel au admin du club ? club ou nous
| /a-propos | Permet d'accéder au infos de ? club ou nous
| /mentions-legales | Permet d'acceder aux mentions légales
| /404 | Affiche une page 404 en cas de route inconnue (si non connecté)
| /tableau-de-bord | Permet d'accéder à son tableau de bord personnel
| /tournois | Permet d'accéder à la liste des tournois à venir, en cours et archivé ? page archive
| /tournois/creer-tournoi | Affiche la page de création d'un tournoi
| /tournois/:slug-du-tournoi | Affiche un tournois spécifique
| /club | Affiche les infos du club
| /membres | Affiche la liste des membres
| /membres/:id-membre | Affiche la page d'un membres afin de voir ses infos publiques et statistiques
| /classements | Affiche le classement des membres
| /profil/:id-membre | Affiche le profil d'un membre
| /aide | Affiche une page aide et FAQ
| /404 (version connecté) | Affiche une page 404 en cas de route inconnue (si connecté)

## Les roles utilisateurs

- Admin
- membre

## Les fonctionnalités

### MVP

- admin
  - création de compte membre
    - nom
    - prénom
    - date de naissance
    - sexe
    - adresse
    - email
    - photo de profil
    - si actif
    - licence
  - modification de compte membre
  - création de tournoi
    - titre
    - date
    - descriptif
    - photo
    - type (all-vs-all)
    - discipline (solo, double femme, double homme, double mixte)
    - organisateurs (gerants suplémentaires optionnels du tournoi)
    - nb de terrains - facultatif
    - limite joueurs/equipes - facultatif
    - Si le tournoi est validé / une notif est envoyée aux adherents - facultatif
  - modification d'un tournoi
  - suppression d'un tournoi
- membre
  - modification de son compte
  - inscription aux tournois
    - en simple
    - en double
      - inscrire une equipe : un nom d'équipe / nom random (option lors de la créa du tournoi)
      - s'inscrire en solo
      - inscrire un partenaire
  - Consultation des tournois passés et voir les resultats
  - Consultation des leaderboards
- admin ou membre avec droit organisateur
  - réorganisation du tournoi (equipes, type, etc...)
  - Le jour du tournoi (tant que le tournoi n'est pas commencé)
    - démarrer le tournoi
    - mettre à jour le tournoi (gagnants, perdants, notes...)
    - cloturer le tournoi / affichage des resultats

### Évolutions futures

- Ajout de type de tournoi (Poules, élimnation direct, etc)
- Ajout d'une vue et filtre pour les tournois archivés
- Gestion du role utilisateur par les admins
- Gestion d'équipes favorites
- Gestion complète des scores
- Ouverture aux inscriptions de joueurs externes au club
- Intégration de l'API officielle du FFBAD
- Gérer une vue spectateur publique
- Gestion multi-club
- Gestion multi-sport
- Messagerie interne
- Intégration d'une section blog

## Use Cases

| En tant que | J'ai besoin de | Afin de |
| --- | --- | --- |
| membre | recevoir un mail | de completer de mon inscription |
| membre | recevoir un mail | d'etre averti de la création d'un tournoi |
| Admin, membre | me connecter | d'acceder à mon contenu |
| Admin, membre | récupérer mon mot de passe | |
| Admin, membre | me déconnecter | sécuriser mon compte |
| Admin, membre | modifier mon profil | le mettre à jour |
| Admin, membre | voir les tournois disponible | pouvoir s'y inscrire |
| Admin, membre | s'incrire à un tournoi | d'y participer |
| Admin, membre | se désinscrire à un tournoi | ne plus y participer |
| Admin, membre | suivre l'état d'un tournoi | |
| Admin, membre | voir les classements des joueurs | |
| Admin | créer un compte membre | donner acces au site à un licencié |
| Admin | importer un fichier csv ou txt | créer des comptes membres en masse |
| Admin | modifier un compte membre | mettre à jour son compte |
| Admin | créer un tournoi | d'organiser une rencontre |
| Admin | modifier un tournoi | mettre à jour une rencontre |
| Admin | cloturer un tournoi | archiver un tournoi |
| Admin | supprimer un tournoi | |
| Visiteur | parcourir le site | découvrir son contenu |
| Visiteur | contacter un admin | poser des questions, demander des infos |

## Liste des pages

- home (presentation du service)
- formulaire de contact du service
- connexion
- récupération de mot de passe
- dashboard admin
- dashboard user
- page profil utilisateur
- page profil du club
- page liste des tournois (tournoi actif propose : inscription individuelle / binome)
- page utilisateur : participation en equipe
- page tournoi en cours (suivre l'avancée du tournoi)
- page classement
- page admin création des membres (unitaire ou en masse)
- page liste membres (avec bouton edit pour l'admin)
- page créer un tournoi
- page tournoi en cours Admin : mettre à jour le tournoi (entrer le score d'un match, cloturer, modifier tant que le tournoi n'a pas commencé)
- page aide dans le dashboard

## Conventions

- langage général: Anglais
- linter: ESLint + config airbnb
- noms des classes HTML: BEM
- noms de fichiers généraux: kebab-case (minuscule et séparé par des tirets)
- noms de dossier généraux: kebab-case (minuscule et séparé par des tirets)
- noms de dossier de composant REACT: PascalCase
- noms de fichier de model: PascalCase
- noms de fonctions: camelCase
- noms de variables: camelCase
- noms de variables CSS: kebab-case
- titres de commit:
  - fix:
  - doc(s):
  - feat:
  - refactor:
  - style:
  - perf:
  - test:
  - build:
  - config:

## Wireframes

​
|Vue|Desktop|Mobile|
|-----|-----|-----|
|home|[version desktop](https://wireframe.cc/kCyS8P)|[version mobile](https://wireframe.cc/XKlu5L)|
|connexion|[version desktop](https://wireframe.cc/MM6bcg)|version mobile|
|dashboard admin|[version desktop](https://wireframe.cc/anlNKU)|[version mobile](https://wireframe.cc/Q0js7U)|
|dashboard membre|[version desktop](https://wireframe.cc/aOnRbN)|[version mobile](https://wireframe.cc/7Pq3CP)|
|tournois|[version desktop](https://wireframe.cc/G8oHsy)|[version mobile](https://wireframe.cc/fEd79p)|
|création d'un tournoi|[version desktop](https://wireframe.cc/pro/pp/b425c4120565529)|[version mobile](https://wireframe.cc/pro/pp/45213f241565534)|
|details d'un tournoi en préparation|version desktop|version mobile|
|details d'un tournoi en cours|version desktop|version mobile|
|details d'un tournoi terminé|version desktop|version mobile|
|club|[version desktop](https://wireframe.cc/UpUgLQ)|[version mobile](https://wireframe.cc/lMlsq0)|
|membres|[version desktop](https://wireframe.cc/bvV69j)|[version mobile](https://wireframe.cc/r0cWah)|
|details d'un membre|version desktop|version mobile|
|classements|[version desktop](https://wireframe.cc/Ddhcvo)|version mobile|
|profil|[version desktop](https://wireframe.cc/HIUrQM)|[version mobile](https://wireframe.cc/lMlsq0)|
|aide|version desktop|version mobile|
|404|version desktop|version mobile|
|mot de passe perdu|[version desktop](https://wireframe.cc/uKfaPB)|[version mobile](https://wireframe.cc/0Bon9w)|
|contact|[version desktop](https://wireframe.cc/IicAxd)|[version mobile](https://wireframe.cc/2Abx44)|
|à propos|version desktop|version mobile|
|mentions légales|version desktop|version mobile|
|404|version desktop|version mobile|
