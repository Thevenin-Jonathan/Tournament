## Dictionnaire de donnée

Table "tournament" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_tournament|integer|primary key|identifiant unique de la table|
|title|text|not null|nom du tournoi|
|slug|text|not null unique|nom du tournoi|
|date|date|not null|date de l'évènement|
|description|text||information libre de l'évènement|
|picture_url|text||adresse de la photo de couverture|
|nb_playground|integer|not null|nombre de terrain disponible simultanément pour le tournoi|
|player_limit|integer||limite maximale de participants|
|code_discipline|integer|foreign key, not null|identifiant unique qui référence discipline|
|code_type|integer|foreign key, not null|identifiant unique qui référence type|
|code_state|integer|foreign key, not null, default 1|identifiant unique qui référence state|
|code_club|integer|foreign key, not null, default 1|identifiant unique qui référence club|
|code_team|integer|foreign key|identifiant unique qui référence la team gagnante du tournoi|

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

Table "state" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_state|integer|primary key|identifiant unique de la table|
|name|text|not null|nom de l'état|

Table "match" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_match|integer|primary key|identifiant unique de la table|
|note|text||commentaire libre|
|code_state|integer|foreign key, not null, default 1|identifiant unique qui référence state|
|code_tournament|integer|foreign key, not null|identifiant unique qui référence tournament|

Table "team" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_team|integer|primary key|identifiant unique de la table|
|code_tournament|integer|foreign key, not null|identifiant unique qui référence tournament|

Table "user" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_user|integer|primary key|identifiant unique de la table|
|firstname|text|not null|prénom|
|lastname|text|not null|nom|
|address|text||adresse postale|
|phone|number||numéro de téléphone|
|birthdate|date|not null|date de naissance|
|is_active|boolean|not null default true| définit si un joueur est actif ou non|
|email|text|not null check()|adresse courriel|
|password|text|not null|mot de passe chiffré|
|url_avatar|text||photo de profil|
|player_license|number not null||licence fédérale|
|code_gender|integer|foreign key, not null|identifiant unique qui référence gender|
|code_club|integer|foreign key, not null, default 1|identifiant unique qui référence club|
|code_role|integer|foreign key, not null, default 2|identifiant unique qui référence role|

Table "gender" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_gender|integer|primary key|identifiant unique de la table|
|name|text|not null|nom du genre|

Table "role" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_role|integer|primary key|identifiant unique de la table|
|name|text|not null|nom du role|

Table "club" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_club|integer|primary key|identifiant unique de la table|
|name|text|not null|nom du club|
|address|text||adresse postale|
|phone|number||numéro de téléphone|
|email|text|not null|adresse courriel|
|logo_url|text||adresse du logo|
|nb_playground|integer|not null|nombre de terrain disponible simultanément du club|
|website|text||adresse web du site du club|
|club_ref|text|not null|identifiant fédéral du club|
|description|text||information libre du club|

Table "result" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|code_result|integer|primary key|identifiant unique de la table|
|label|text|not null|résultat de l'équipe, nombre de set gagné ou forfait (0, 1, 2 ,F)|

Table d'association "play" :
|Champ|Type|Spécificités|Description|
| --- | --- | --- | --- |
|is_winner|boolean|not null| définit si l'équipe est gagnante|
|code_result|integer|foreign key, not null|identifiant unique qui référence result|
|code_team|integer|primary key, foreign key, not null|partie de l'identifiant unique de la table et identifiant unique qui référence team|
|code_match|integer|primary key, foreign key, not null|partie de l'identifiant unique de la table et identifiant unique qui référence match|