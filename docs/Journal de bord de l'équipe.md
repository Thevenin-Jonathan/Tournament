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
- 
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