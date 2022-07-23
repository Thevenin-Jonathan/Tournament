# API Tournament

## Installation de sqitch

- Sur Windows
  - Télécharger Strawberry-Perl [ici](https://strawberryperl.com/) et l'installer
  - Ouvrir un le Perl CLI
  - lancer la commande: ```cpan install App::Sqitch DBD::Pg```
  - si erreur : ```cpan install DBD::Pg```
  - si encore erreur : ```cpanm install DBD::Pg```

- Sur MAC
  - Ouvrir le terminal
  - Lancer la commande ```brew tap sqitchers/sqitch```
  - Puis lancer cette commande ```brew install sqitch --with-postgres-support```

- Sur Linux
  - Ouvrir le terminal
  - Lancer la commande ```apt-get install sqitch libdbd-pg-perl postgresql-client```

## Installation de la DB

- Avoir sqitch installé sur le systeme
- Dans le terminal, se placer dans le dossier __"/server/sqitch"__
- Lancer la commande `bash sqitch_init.sh`
- Rentrer le password du Super-User __"postgres"__ (Vous pouvez modifier le nom du SU dans __"sqitch_init.sh"__ L2)
- Rentrer le password de l'utilisateur __"tournament_admin"__
- La base de donnée est configurée
- Pour déployer les migrations diponibles, plusieurs possibilités:
  - Si, pour éviter de taper le password SU, vous êtes en __trust__ dans le __"pg_hba.conf"__:
    - Lancer la commande `sqitch deploy`
  - Sinon 2 choix:
    - 1)
      - Lancer la commande `sqitch deploy db:pg://tournament_admin:password@localhost/tournament` en remplacant __"password"__ par le vrai password
    - 2)
      - Exporter votre mot de passe dans la variable d'environnement PG avec cette commande: `export PGPASSWORD=password` en remplacant __"password"__ par le vrai password
      - Lancer la commande `sqitch deploy`
- Si besoin, lancer le script `npm run db-seed` pour seed la base de donnée avec des données générées aléatoirement

## Utilisation de Debug (console.log amélioré)

- En haut du fichier insérez cette ligne: `const debug = require("debug")("nom-du-prefix-aux-choix")`
- Remplacer les `console.log("msg");` par `debug("msg");`

## Commandes Heroku

- Push la branche main sur heroku:
  >`git push heroku main`
- Ajouter heroku en target de deploiement sqitch:
  >`sqitch target add heroku postgres://user:pwd@host/db`
- Lancer le deploiement de sqitch:
  >`sqitch deploy heroku`
- Seed la base de données:
  >`heroku pg:psql -f ./sqitch/seed_db.sql`
- Lancer une fenetre navigateur avec l'app sur heroku:
  >`heroku open`
- Lancer les logs du serveur heroku:
  >`heroku logs --tail`
- Lancer un bash sur le terminal d'heroku:
  >`heroku run bash`
- Lancer le CLI psql sur le terminal d'heroku:
  >`heroku pg:psql`
- Lancer le serveur heroko en local:
  >`heroku local web`
- Voir les addonc installés sur heroku:
  >`heroku addons`
- Installer et lancer un addon de logger heroku dans le navigateur
  >`heroku addons:create papertrail`
  >`heroku addons:open papertrail`

## Architecture actuelle du serveur

┣📄index.js\
┣📦config\
┃ ┗📄database.js (configure le Pool et la connection)\
┣📦controllers (controle les endpoints)\
┃ ┣📄index.js\
┃ ┗📄tournamentController.js\
┣📦datamapper\
┃ ┗📄tournament.js\
┣📦routers\
┃ ┣📄index.js\
┃ ┣📄login.js\
┃ ┣📦v1\
┃ ┣ ┣📄index.js\
┃ ┃ ┗📄tournamentRouter.js\
┣📦services\
┃ ┣📄authenticationJWT.js\
┃ ┣📄errorHandler.js\
┃ ┗📄controllerWrapper.js (couche de try and catch sur les controllers)\
┣📦validations (valide les données selon les schemas)\
┃ ┣📦schemas\
┃ ┗📄validation.js\
