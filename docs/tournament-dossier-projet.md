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
  - [Routes (front)](#routes-front)
  - [Les roles utilisateurs](#les-roles-utilisateurs)
  - [Les fonctionnalités](#les-fonctionnalités)
    - [MVP](#mvp)
    - [Évolutions futures](#évolutions-futures)
  - [Use Cases](#use-cases)
  - [conventions](#conventions)
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
  - HTML, CSS, JS, React, Redux

## Les navigateurs compatibles
- Chrome
- Firefox
- Safari
- Opera
- Edge

## Arborescence
https://www.gloomaps.com/YsdgTyfRa3

📄home\
 ┣ 📄connexion\
 ┃  ┣ 📄dashboard\
 ┃  ┃  ┣ 📄tournois\
 ┃  ┃  ┃  ┣ 📄création d'un tournoi\
 ┃  ┃  ┃  ┗ 📄details d'un tournoi\
 ┃  ┃  ┣ 📄club\
 ┃  ┃  ┣ 📄membres\
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

## Routes (front)
- /
- /connexion
- /mot-de-passe-perdu
- /contact
- /a-propos
- /mentions-legales
- /404
- /tableau-de-bord
- /tournois
- /tournois/creer-tournoi
- /tournois/:slug-du-tournoi
- /club
- /membres
- /membres/:id-membre
- /classements
- /profil/:id-membre
- /aide
- /404 (version connecté)


## Les roles utilisateurs
- Admin
- membre (interne ou externe)


## Les fonctionnalités
### MVP
  - admin
    - création de compte membre
      - nom
      - prénom
      - age
      - sexe
      - adresse
      - email
      - photo de profil
    - modification de compte membre
    - création tournoi rapide (préconstruit, sans notif)
    - création de tournoi - avancée
      - nom
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


pages :
- home : presentation du service
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

## conventions

- langage général: Anglais
- linter: ESLint + config airbnb
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
