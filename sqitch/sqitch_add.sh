# Création d'une nouvelle révision de la DB avec sqitch

# 1. Demande à l'utilisateur le nom de la migration et l'insert dans une variable temporaire
read -p "Nom de la migration (ex: oclock_r2):" FILENAME

# 2. Demande à l'utilisateur la description de la révision et l'insert dans une variable temporaire
read -p "Déscription de la migration (ex: Création des tables):" DESCRIPTION

# 3. Création de la révision grace au variables des entrées de l'utilisateur
sqitch add $FILENAME -n "$DESCRIPTION"