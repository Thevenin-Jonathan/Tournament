# 1. Création des variable d'environnements
export PGUSER=postgres                                      # Super-utilisateur pour créer la db et l'utilisateur
export PGHOST=localhost                                     # Adresse du serveur
export NEWDBNAME=tournament                                 # Nom de la nouvelle DB
export NEWDBUSER=tournament_admin                           # Nom de l'utilisateur de la nouvelle DB
export ENGINE=pg                                            # Nom du client de base de donnée utilisé
export SQITCHNAME=tournament_sqitch                         # Nom du projet sqitch
export SQITCHTARGET=db:pg://$NEWDBUSER@$PGHOST/$NEWDBNAME   # Addresse complete du serveur avec ID-HOST-DB
export SQITCHTOPDIR=migrations                              # Dossier parent des fichiers de migrations

# 2. Demande le mdp SU
read -s -p "Mot de passe super-utilisateur:" FILENAME       # Demande de taper le mot de passe super utilisateur de postgresSQL
echo "";                                                    # Retour à la ligne
export PGPASSWORD=$FILENAME                                 # Exporte temporairement la variable dans l'environnement

# 2. Création d'un utilisateur en DB
createuser -l -w -P $NEWDBUSER

# 3. Création d'une DB NEWDBNAME dont le propriétaire est NEWDBUSER
createdb -O $NEWDBUSER $NEWDBNAME

# 4. Initialisation de Sqitch
sqitch init $SQITCHNAME --engine pg --target $SQITCHTARGET  --top-dir $SQITCHTOPDIR

# 5. Configuration de Sqitch (Facultatif)
sqitch config deploy.verify true      # Force une vérification après chaque deploiement
sqitch config revert.no_prompt true   # Supprimer la confirmation des revert (Evite de taper "Yes")