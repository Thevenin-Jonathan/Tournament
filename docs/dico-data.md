## Dictionnaire de donnée

Table "tournament" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_tournament|integer|primary key|identifiant unique de la table|
|title|text|not null|nom du tournoi|
|date|date|not null|date de l'évènement|
|description|text||information libre de l'évènement|
|picture_url|text||adresse de la photo de couverture|
|nb_playground|integer|not null|nombre de terrain disponible simultanément pour le tournoi|
|player_limit|integer||limite maximale de participants|
|code_discipline|integer|foreign key, not null|identifiant unique qui référence discipline|
|code_type|integer|foreign key, not null|identifiant unique qui référence type|
|code_state|integer|foreign key, not null|identifiant unique qui référence state|
|code_club|integer|foreign key, not null|identifiant unique qui référence club|

Table "discipline" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_discipline|integer|primary key|identifiant unique de la table|
|name|text|not null|nom de la discipline (simple/double - homme/dame/mixte)|

Table "type" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_type|integer|primary key|identifiant unique de la table|
|name|text|not null|format du tournoi (All vs All, championnat, élimination directe, etc)

Table "club" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_club|integer|primary key|identifiant unique de la table|
|name|text|not null|nom du club|
|address|text||adresse postale|
|phone|text||numéro de téléphone|
|email|text|not null|adresse courriel|
|logo_url|text||adresse du logo|
|nb_playground|integer|not null|nombre de terrain disponible simultanément du club|
|website|text||adresse web du site du club|
|club_ref|text||identifiant fédéral du club|
|description|text||information libre du club|

Table "user" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_user|integer|primary key|identifiant unique de la table|
|firstname|text|not null|prénom|
|lastname|text|not null|nom|
|address|text||adresse postale|
|birthdate|date|not null|date de naissance|
|sex|text|not null|sexe|
|email|text|not null|adresse courriel|
|password|text|not null|mot de passe chiffré|
|url_avatar|text||photo de profil|
|player_license|text||licence fédérale|
|code_club|integer|foreign key, not null|identifiant unique qui référence club|
|code_role|integer|foreign key, not null|identifiant unique qui référence role|

Table "role" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_role|integer|primary key|identifiant unique de la table|
|name|text|not null|nom du role|"
"
Table "team" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_team|integer|primary key|identifiant unique de la table|
|code_tournament|integer|foreign key, not null|identifiant unique qui référence tournament|

Table "match" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_match|integer|primary key|identifiant unique de la table|
|note|text||commentaire libre|
|code_state|integer|foreign key, not null|identifiant unique qui référence state|
|code_tournament|integer|foreign key, not null|identifiant unique qui référence tournament|

Table "state" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_state|integer|primary key|identifiant unique de la table|
|name|text|not null|nom de l'état|

Table d'association "play" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_play|integer|primary key|identifiant unique de la table|
|score|text||résultat de l'équipe, nombre de set gagné ou forfait (0, 1, 2 ,F)|
|is_winner|boolean|default false| définit si l'équipe est gagnante|
|code_team|integer|foreign key, not null|identifiant unique qui référence team|
|code_match|integer|foreign key, not null|identifiant unique qui référence match|