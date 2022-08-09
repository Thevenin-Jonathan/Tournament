BEGIN;

TRUNCATE "club", "user", "role", "discipline", "state", "type", "tournament", "match", "team", "gender", "result", "match_has_team", "tournament_has_user", "team_has_user" RESTART IDENTITY CASCADE;

INSERT INTO "club" ("name", "address", "phone", "email", "logo_url", "nb_playground", "website", "club_ref", "description") VALUES
  ('Bayard Bad', '667 avenue de la Chartreuse, 38530 Pontcharra', '5780460828', 'leastby0@wufoo.com', 'logo-bayard-bad-blanc.png', '7', 'https://bayardbad.fr/', 'BB38', 'Le BAYARD BAD BB38 est un club de badminton affilié à la FFBAD, à Pontcharra, ouvert aux joueurs loisir, intermédiaires, confirmés ou compétiteurs. Bayard Bad engage des équipes dans les tournois d’interclubs adultes organisés par le Comité Isère de Badminton.  L’esprit du club est convivial et sportif : venez pour jouer, et progresser dans votre sport favori ! Vous trouverez sur le site toutes les informations nécessaires à votre inscription, les horaires, tarifs, certificat médical à télécharger, informations générales sur le club, les événements du club et les rapports d’interclubs.');

INSERT INTO "role" ("name") VALUES
  ('admin'),
  ('member');

INSERT INTO "gender" ("name") VALUES
  ('male'),
  ('female');

INSERT INTO "discipline" ("name") VALUES
  ('single_m'),
  ('single_f'),
  ('double_m'),
  ('double_f'),
  ('double_mix');

INSERT INTO "type" ("name") VALUES
  ('all_vs_all');
  
INSERT INTO "state" ("name") VALUES
  ('created'),
  ('generated'),
  ('started'),
  ('closed');


INSERT INTO "tournament" ("title", "slug", "date", "description", "picture_url", "nb_playground", "player_limit", "discipline_id", "type_id", "state_id", "club_id") VALUES
  ('Champion''s trophy', 'champions-trophy', '01/08/2022', 'La fin de saison est proche !', 'https://kinoah.com/images/tournament/cover/bad-03.jpg', '6', '25', '1', '1', '1', '1'),
  ('Tournoi Elegance 2022', 'tournoi-elegance-2022', '08/08/2022', 'Le tournoi pour celles qui veulent en découdre !', 'https://kinoah.com/images/tournament/cover/bad-01.jpg', '7', null, '2', '1', '1', '1'),
  ('Tournoi des brutes', 'tournoi-des-brutes', '23/07/2022', 'Un tournoi en duo uniquement pour les hommes virils', 'https://kinoah.com/images/tournament/cover/the-witcher.jpg', '7', '30', '3', '1', '2', '1'),
  ('Tournoi Lady Double', 'tournoi-lady-double', '19/07/2022', 'Un tournoi en duo pour l''élite féminine', 'https://kinoah.com/images/tournament/cover/bad-05.jpg', '7', null, '4', '1', '3', '1'),
  ('Tournoi Téléportal III', 'tournoi-teleportal-iii', '01/06/2022', 'Célebre et difficile...', 'https://kinoah.com/images/tournament/cover/portal2.jpg', '5', '25', '5', '1', '4', '1'),
  ('Tournoi du trône de fer', 'tournoi-du-trone-de-fer', '06/06/2022', 'Presque tous les coups sont permis', 'https://kinoah.com/images/tournament/cover/got01.jpg', '5', '25', '5', '1', '4', '1');

INSERT INTO "user" ("firstname","lastname","address","birthdate","is_active","email","password","url_avatar","player_license","created_at","updated_at","club_id","role_id","phone","gender_id") VALUES
	 ('Jonathan','Thevenin','Rue des fleurs, 31100 Toulouse','1990-04-12',true,'jonathan@gmail.com','$2a$10$vOUYY2w4YemevAAsed8S/u./U9PLwvcmsrk7srPekaPtgxS89hZXa','jonathan.jpg','6945214','2022-07-31 13:03:53.912275+02','2022-07-31 13:03:53.912275+02',1,2,NULL,1),
	 ('Cédric','Bernard','Avenue de la gare, 75005 Paris','1979-07-04',true,'cedric@gmail.com','$2a$10$vOUYY2w4YemevAAsed8S/u./U9PLwvcmsrk7srPekaPtgxS89hZXa','cedric.jpg','6945648','2022-07-31 13:03:53.912275+02','2022-07-31 13:03:53.912275+02',1,2,NULL,1),
	 ('Tino','Pajaro','Disneyland, 77420 Marne-la-vallée','1977-11-21',true,'tino@gmail.com','$2a$10$vOUYY2w4YemevAAsed8S/u./U9PLwvcmsrk7srPekaPtgxS89hZXa','tino.jpg','61315648','2022-07-31 13:03:53.912275+02','2022-07-31 13:03:53.912275+02',1,2,NULL,1),
	 ('El Houceine','El Handouz','Impasse du lila, 75016 Paris','1995-02-10',true,'houceine@gmail.com','$2a$10$vOUYY2w4YemevAAsed8S/u./U9PLwvcmsrk7srPekaPtgxS89hZXa','houceine.jpg','66315648','2022-07-31 13:03:53.912275+02','2022-07-31 13:03:53.912275+02',1,2,NULL,1),
	 ('Anestassia','Hollow','497 avenue xwrecks E 47615 sticker','1933-12-08',true,'ahollow0@artisteer.com','r2ecVY7ook6RVw7s193067EF938zC5m9t38GB9285050Z5TfHGy117RoR1VAC45l',NULL,'3528826604','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.519575+02',1,2,NULL,2),
	 ('Randi','Mullins','60 avenue mfizz wind 94075 mumpss','1955-09-22',true,'rmullins1@linkedin.com','0762WKU8u66J9Vxcu92ykWxN25v2PK53Ub4TD82yRI8z9k8JMKx9bce870466Zx2',NULL,'1625023554','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.528378+02',1,2,NULL,2),
	 ('Evin','Ferron','90 avenue tmarrow runny 33177 fiche','1950-11-20',false,'eferron2@umn.edu','qwf56K71V6UNDm54hIDH99cv48M2qIInJ74wX195J50I7U7C6wgw28QmZm0da7ra',NULL,'5247867367','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.529622+02',1,2,NULL,1),
	 ('Husain','Birdwhistell','542 rue nsinge zebras 47672 helmets','1973-07-24',false,'hbirdwhistell3@spiegel.de','645bq7xeE5s2174wK2otHHx03r4c43L19H7P8zMe3Kf105e150x1mWT9GSP8pq9m',NULL,'3595293457','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.53141+02',1,2,NULL,2),
	 ('Davina','Paylor','3 boulevard cejected volumes 39372 assailing','1989-02-09',false,'dpaylor4@army.mil','SCFeBKo84W5sU7S26M95nD2i756PQRo71q3361TAZw67Aj6RG397k172VV11n409',NULL,'4821782807','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.533209+02',1,2,NULL,2),
	 ('Annetta','Avramovsky','587 rue dkiosks row 71605 lent','1953-07-04',false,'aavramovsky5@surveymonkey.com','0gHci23024027Z57RmDgx5v9C12f9QZh536b16RW9301y8xb8z7Yx6V5A0O7uUmn',NULL,'5138467818','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.5345+02',1,2,NULL,2),
	 ('Lyda','Denziloe','6634 boulevard lurn  07027 reviving','1936-06-26',false,'ldenziloe6@nasa.gov','MZ7Q1579yfzOJ788Ibe037u0pf58276I4r5947iF1A62N39sa2s5i29FlD293475',NULL,'1679609472','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.535268+02',1,2,NULL,1),
	 ('Raimondo','MacDiarmid','26 avenue qauburn whence 34713 craggiest','1986-11-25',true,'rmacdiarmid7@earthlink.net','kDW2794y208B06WeF72aqQbo369j43Y21lAa1459aK1UV4LxH9FO6E12k41pgJ4L',NULL,'3224229046','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.53594+02',1,2,NULL,2),
	 ('Margo','Robey','64 avenue aflap V 89201 papacys','1933-11-30',false,'mrobey8@lulu.com','7yg89l28XH73F84kZ2M9h302l26ta48494F1980416Rj6051RFB65870S0whO732',NULL,'8503891579','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.53667+02',1,2,NULL,2),
	 ('Chevy','OCalleran','3505 rue zcompost desists 40774 looneyies','1955-04-25',true,'cocalleran9@joomla.org','kw6PrH2ASC56kiS5c9174j6mMf04QM8891U8678VMW0912o341682j3kqMHiq8m0',NULL,'3120265134','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.537353+02',1,2,NULL,1),
	 ('Janean','Taphouse','285 rue xsprings days 73650 healer','1961-11-28',true,'jtaphousea@tumblr.com','2551K3DAH329c4u2740hw9868B49515id6eWW7114wkeqtYFBkq4Ibe9n026PB4Z',NULL,'3497323244','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.538015+02',1,2,NULL,2),
	 ('Ruthi','Sunter','918 avenue vdecided  73086 precious','1982-07-01',false,'rsunterb@berkeley.edu','Ex6Z7n5tScN7O0p929mx8la77egYqz1SF476ks556tqgqm8a3oZ91n4465gmRawD',NULL,'4744504555','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.538688+02',1,2,NULL,2),
	 ('Donni','Swanne','092 avenue dcrux gybe 50944 adages','1975-06-07',true,'dswannec@livejournal.com','10647mqn9jT3E29b05901LtHO6mAtEo33L9Q4l1753Haq9k7V415U58u6YZcM7D1',NULL,'1236793968','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.53933+02',1,2,NULL,1),
	 ('Rainer','Edelheit','0 boulevard yeyed arcs 15317 betterment','1951-12-29',false,'redelheitd@businessweek.com','78X34QK5n27m5188771pB205fs64ZY3bA7h21s6Uf8bs596p828F97gI5NKSF0o2',NULL,'7120379647','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.539964+02',1,2,NULL,1),
	 ('Reidar','Burnhill','66 rue mhated as 83364 driveways','1958-05-03',true,'rburnhille@studiopress.com','4k0avSWEv749aW1W270CNHCm21525L5qav619n69PWi1ag6v2zE2z6tQolL3du91',NULL,'3002722875','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.540609+02',1,2,NULL,2),
	 ('Hurley','Taveriner','284 boulevard xclear puff 81928 heretics','1937-10-28',false,'htaverinerf@marketwatch.com','S4h72C3zqw4ngT1bgE9UXmwV76A480968Mk8t9s6yWf5X16Zs38F3UE5837l2c2F',NULL,'4169769648','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.541131+02',1,2,NULL,1),
	 ('Timmi','Jamme','9742 boulevard rhoeing so 35458 corset','1999-05-10',true,'tjammeg@squarespace.com','nhS9x2E4v242nnx0S9408u1C4hj7J7Fk66oZ18mb6Kd9mrgUS513lvGS5aT7yG0F',NULL,'5541570423','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.541618+02',1,2,NULL,2),
	 ('Angele','Tolwood','09 avenue aminions clerk 79283 harping','1966-08-03',true,'atolwoodh@adobe.com','i2xt7f05Jz90yPH264RT8Lz90Hvw560504Yi6Y759K1gUPGX6ssu63A22452Yfs6',NULL,'2664465033','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.542137+02',1,2,NULL,2),
	 ('Murdock','Formigli','1 rue istunk dark 24324 prepaying','1992-04-18',false,'mformiglii@google.pl','79Z601I01Nx1pieCjc4Fof2d9L4nU71T6tCB73P8g38jaf6hW55EQlbli60pr4c2',NULL,'1200643475','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.542643+02',1,2,NULL,1),
	 ('Emmeline','Bamlet','1 avenue umulls ode 82687 faultier','2005-08-16',true,'ebamletj@amazon.co.uk','9q4v64l67AL2kfsOf3aa3196q87E0P5F6aX87679552dR1J8e01kpS4qJ0nM6WB9',NULL,'0610953736','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.54312+02',1,2,NULL,2),
	 ('Archibald','Buxam','05 boulevard uoily it 57021 lunging','1987-05-07',false,'abuxamk@yandex.ru','jJgPO947B6x9GiTZK2Cx43P7oSC8m7ynbZLPdXg1FZ5agn1aiyJ9m4z4EhDQI59W',NULL,'1138848841','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.543607+02',1,2,NULL,1),
	 ('Gabbi','Garlinge','8891 boulevard wspies sleds 49760 midwifed','1935-02-10',false,'ggarlingel@tmall.com','U86MexQ494es8DbG0ANP2F6h79FPU5j8798YrSo01039g7fcPh0895TJ3PFkU26G',NULL,'9113751469','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.544165+02',1,2,NULL,1),
	 ('Marlowe','Shurey','569 boulevard vwoe ma 22753 masterly','1984-04-21',false,'mshureym@skype.com','07EB0Zo5hYW3EHVk8R853a5840e356VWEne0G5wh0e5qo55364L75o9Q2800I8mL',NULL,'2404302736','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.544723+02',1,2,NULL,2),
	 ('Brennan','Bortolini','67 boulevard yhugs pun 06053 roars','1955-02-18',true,'bbortolinin@instagram.com','c8F738qpE4439T4FkHRh49V17f37n1n0L84aSt8dOZS17cQeL759s7Bc314vIV9T',NULL,'8080171891','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.545289+02',1,2,NULL,2),
	 ('Dorothea','Danser','855 rue fpeal an 55324 iron','1993-10-04',true,'ddansero@cornell.edu','Ir7ieL7hietDD5G7k7hvX02DIr6L0F0jo0Z566W10LkNuZ15v63gr8s6s47c66Jq',NULL,'5366423451','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.546451+02',1,2,NULL,1),
	 ('Colene','Goodding','83 avenue gpeeks yaps 13831 hyacinth','1992-03-23',false,'cgooddingp@prnewswire.com','B90MQK97q39LJA3U4p34203El0Vdc049Da78W2Z20txnPV4hs7b4e928K12fNR7X',NULL,'7359918482','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.54856+02',1,2,NULL,1),
	 ('Martine','Astone',NULL,'2022-07-15',true,'martine@gmail.com','$2b$10$6MYzkTQEAUD3juYwkwn5.u7jSbyOuinjyN9v3rYA2oGJbyJ7e10Ga',NULL,'613254796','2022-07-31 19:14:06.225712+02','2022-07-31 19:14:06.225712+02',1,2,NULL,2),
	 ('Paul','Auchon',NULL,'1985-08-10',true,'paul@gmail.com','$2b$10$n199a5nW9w5bydJ6zo802OunY5gPz9strxApbkEcEhhBCbdoK8ZXW',NULL,'123456789','2022-08-02 12:18:13.04854+02','2022-08-02 12:18:13.04854+02',1,2,NULL,1),
	 ('Louise','Roche',NULL,'2012-11-17',true,'louise@gmail.com','$2b$10$CpXYial8LE5DKLMO5jxeXez75PITg3lUR5dy8mu1QR1Eamynzec12',NULL,'0102030405','2022-08-03 13:52:01.799173+02','2022-08-03 13:52:01.799173+02',1,2,NULL,2),
	 ('Lucky','Reder','8822 boulevard bkink punts 12952 hints','1946-09-12',false,'lrederq@yahoo.co.jp','5mjA7865112X5uNd266i9GjD0w785YB33i5Ux0sy8355dj159I9BZ2uX738cX7l7',NULL,'1631663298','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.550187+02',1,2,NULL,2),
	 ('Wilhelmina','Bromehead','9 avenue mdeath sewn 37503 paddocked','1994-02-26',true,'wbromeheadr@trellian.com','BB3BTgn296239ojk1661912gSabQ6Tqsus8ptQg7N6vp5648X17ti1wSkjH72951',NULL,'4900723120','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.55146+02',1,2,NULL,1),
	 ('Jacklyn','McInnery','71 avenue krayon shown 89477 until','1976-02-05',false,'jmcinnerys@wunderground.com','1VLn38q893537b5c945l3j1y3X42ep9Yk9T7d37146S3IH3Cu7ez9Um203g99bVq',NULL,'2945111722','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.552282+02',1,2,NULL,1),
	 ('Godfry','Holtom','1967 rue pensures popped 74326 erects','1947-07-31',false,'gholtomt@mapy.cz','66y234a021581NQWyvZ566ap83CxUu50G5Go6UE0FoJxL79YCd3evLJd79C2Kr1o',NULL,'0108703186','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.553063+02',1,2,NULL,1),
	 ('Cristiano','Cambell','9 rue mpry  64962 romps','2000-01-19',false,'ccambellu@sourceforge.net','6hL3S3vb4RfD74R41rUlO3C3L2w16a0FK5S91usgnH422p64bEJ09q2794Q27C66',NULL,'6670323298','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.553715+02',1,2,NULL,1),
	 ('Charmian','Morter','65 avenue yread pony 16423 clog','1962-11-09',true,'cmorterv@biglobe.ne.jp','5mU983639agH6I0XLD804y769086SccO9o8Z32U57V09626Z69481029VEho2SHz',NULL,'7456813493','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.554328+02',1,2,NULL,2),
	 ('Alexandra','Rappoport','742 avenue iOKs lend 78264 filmy','1983-08-17',true,'arappoportw@prnewswire.com','YvGnAS7muf96OPco55K80S2988yi5vW3f1e9o14sh0Eh7mf8783Elu5G40Le3G45',NULL,'6124756577','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.555051+02',1,2,NULL,2),
	 ('Shepard','Wheeldon','3 boulevard sbugler  75042 dish','1972-03-08',true,'swheeldonx@earthlink.net','oO66Wp2vp512vQw4E2dWU24lbAAtV14485133Hg76n4r656wUHbxTnw5nc07K772',NULL,'2644807570','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.555857+02',1,2,NULL,2),
	 ('Issiah','Penniall','6 boulevard zhips run 99665 extroverts','1974-11-22',false,'ipennially@usa.gov','331e66u3xd17Ip673vtI41d846VZ2aB4hI48fY8575757gS9ueCZy8a7076uQ8es',NULL,'7788173301','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.55707+02',1,2,NULL,2),
	 ('Kitti','Mandel','9 boulevard qtiny thence 22483 disbands','1983-12-28',true,'kmandelz@biblegateway.com','11b96J08ml9KY75n345a9y9p111715J50928iqLw9V36MNu8v7ud641cp61yp5a4',NULL,'4781000227','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.558506+02',1,2,NULL,2),
	 ('Ramonda','Semour','6 boulevard atwos gabbed 08039 martyr','1954-10-08',true,'rsemour10@google.fr','2RG48t4v0212wVf371T6u4LNm20a2W2f0zkS6vbGx8mt57bz213P02ALh74Iaw27',NULL,'7806106895','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.559936+02',1,2,NULL,1),
	 ('Langston','McDavid','6 rue qmending one 13193 hump','1971-11-26',true,'lmcdavid11@abc.net.au','qnq00L5142x986422239e46F1vkbP2600615X5137pi731Sn9Y7G03q221FC1z41',NULL,'9484340916','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.560896+02',1,2,NULL,2),
	 ('Thebault','Craine','6 boulevard efalsity art 15278 silt','1948-01-14',false,'tcraine12@apple.com','q12T97J940t3s572JE7z6aCd7L98te450b5e01EY08365qI5437075Db9983sTl6',NULL,'2731257804','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.562092+02',1,2,NULL,2),
	 ('Aila','Kingsland','007 rue dwars grinds 24064 buffets','1995-01-29',true,'akingsland13@mtv.com','83o5kS7zYLUOEH51388264q24Gl117FeW27AO891hXe3l2kbhTuHl4n901xiXYP4',NULL,'4793242165','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.563784+02',1,2,NULL,2),
	 ('Kassie','Stammler','59 avenue ybye ameba 75217 placentas','1967-04-30',true,'kstammler14@dmoz.org','iY48Y042578P4V0rF3y1vX732330GKg705aiNG5fJw4PV8PA5Twt7O86IC9x5q8A',NULL,'9205870189','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.565961+02',1,2,NULL,2),
	 ('Inigo','Figliovanni','0286 boulevard xrefusal G 68176 weep','1945-12-25',false,'ifigliovanni15@vkontakte.ru','9kHX3309dp0FlA80reuL7s78h545J5a1RwRni6zEb30sy901193J8Sk698RzfTo2',NULL,'0932434681','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.5676+02',1,2,NULL,2),
	 ('Margaret','Wilds','1915 rue esun mauls 38883 skyed','1975-01-05',false,'mwilds16@eepurl.com','c8IFY1Q30h6CEAvcrLNa12U8vRtHzL6mJ12k2759n6p5Ny3145fq02TX80h58l2e',NULL,'7682800711','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.568957+02',1,2,NULL,2),
	 ('Gabbey','Starford','079 boulevard gtore pad 68784 profiles','2011-08-08',false,'gstarford17@house.gov','8oDCQ1c0gKU3ajy1IoXmhTHg685905otl0ygd2350G71W8RS4790Y673TmBxwpa7',NULL,'6152286029','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.569966+02',1,2,NULL,1),
	 ('Michaelina','Culleton','4129 boulevard ogoals robe 55026 nutted','1939-09-04',true,'mculleton18@google.fr','0R06lPPJ40p0i3a2PGa3vX1K3iQ9y81Hpj0N28a5w7ZW8dyvM987oo6Fd3C3d869',NULL,'9329297783','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.57123+02',1,2,NULL,2),
	 ('Inigo','Baignard','3594 rue clist  89368 bellboys','1977-12-27',true,'ibaignard19@businesswire.com','QpW1775605345Fk81069rnTy4K43T12ns322N59947w44meYU817P0d0g526z941',NULL,'4825784018','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.572391+02',1,2,NULL,2),
	 ('Berny','MacKaile','7 avenue oskits vex 51302 badgers','1957-01-14',true,'bmackaile1a@digg.com','1735Q95aI7Sc4w14z7QK9c7A422N30VIUph477459R6Vx4nJ57v44u60s818Y618',NULL,'3409369856','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.573326+02',1,2,NULL,1),
	 ('Consuelo','Busse','4 avenue scrocus havoc 35441 skills','1975-08-21',false,'cbusse1b@epa.gov','9v7709n2IG44E9YT92Zr5AX6n3J5R2GNshxI00FGz3b36eR5i308k738f19D0BDl',NULL,'1336594709','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.574112+02',1,2,NULL,2),
	 ('Angelita','Limbourne','32 avenue salive twos 65354 snowstorm','1993-05-04',false,'alimbourne1c@chicagotribune.com','Z7393u8AG6y3NY3n40cTH3e9331g2d7Pw03A4AG9g9RzXXd44W310P6nuc16E10V',NULL,'2050053868','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.574786+02',1,2,NULL,1),
	 ('Briana','Aberdalgy','98 boulevard zsea six 78522 tuba','1958-05-27',false,'baberdalgy1d@lycos.com','861f6rh68s7bYT4sTE0qk27q8z59qL3x98550f521MW7BPfT0AtUL4Rid2g618FU',NULL,'6123989687','2022-07-31 13:03:53.912275+02','2022-08-03 20:04:10.575432+02',1,2,NULL,1),
	 ('Tom','Roche','Passage de la clé des champs, 38530 Pontcharra !','1980-02-29',true,'tom@gmail.com','$2a$10$vOUYY2w4YemevAAsed8S/u./U9PLwvcmsrk7srPekaPtgxS89hZXa','tom.jpg','3554666','2022-07-31 13:03:53.912275+02','2022-08-04 10:39:08.445902+02',1,1,NULL,1);

INSERT INTO "result" ("label") VALUES
  ('0'),
  ('1'),
  ('2'),
  ('f');

INSERT INTO "team" ("tournament_id") VALUES
  ('5'),
  ('5'),
  ('5'),
  ('5'),
  ('5'),
  ('4'),
  ('4'),
  ('4'),
  ('4'),
  ('4'),
  ('3'),
  ('3'),
  ('3'),
  ('3'),
  ('3'),
  ('2'),
  ('2'),
  ('1');

INSERT INTO "match" ("note", "state_id", "tournament_id") VALUES
  (null, '1', '3'),
  (null, '1', '3'),
  (null, '1', '3'),
  (null, '1', '3'),
  (null, '1', '3'),
  (null, '1', '4'),
  (null, '1', '4'),
  (null, '1', '4'),
  (null, '1', '4'),   
  (null, '1', '4'),
  (null, '4', '5'),
  (null, '4', '5'),
  (null, '4', '5'),
  (null, '4', '5'),
  (null, '4', '5');

INSERT INTO "match_has_team" ("result_id", "is_winner", "team_id", "match_id") VALUES
  (null, null, '10', '10'),
  (null, null, '9', '10'),
  ('1', false, '8', '9'),
  ('3', true, '7', '9'),
  ('1', false, '6', '8'),
  ('3', true, '7', '8'),
  (null, null, '8', '7'),
  (null, null, '10', '7'),
  ('3', true, '9', '6'),
  ('2', false, '6', '6'),
  (null, null, '11', '5'),
  (null, null, '15', '5'),
  (null, null, '12', '4'),
  (null, null, '14', '4'),
  (null, null, '13', '3'),
  (null, null, '15', '3'),
  (null, null, '13', '2'),
  (null, null, '11', '2'),
  (null, null, '14', '1'),
  (null, null, '11', '1'),
  ('3', true, '5', '11'),
  ('1', false, '4', '11'),
  ('3', true, '3', '12'),
  ('2', false, '2', '12'),
  ('2', false, '1', '13'),
  ('3', true, '2', '13'),
  ('1', false, '3', '14'),
  ('3', true, '4', '14'),
  ('2', true, '5', '15'),
  ('4', false, '1', '15');


INSERT INTO "team_has_user" ("team_id", "user_id") VALUES
('18', '1'),
('17', '47'),
('16', '5'),  
('15', '11'),
('15', '2'),
('14', '3'),
('14', '54'),
('13', '17'),
('13', '14'),
('12', '4'),
('12', '38'),
('11', '1'),
('11', '51'),
('10', '6'),
('10', '9'),
('9', '39'),
('9', '46'),
('8', '12'),
('8', '16'),
('7', '5'),
('7', '10'),
('6', '13'),
('6', '15'),
('5', '22'),
('5', '36'),
('4', '12'),
('4', '45'),
('3', '3'),
('3', '9'),
('2', '50'),
('2', '31'),
('1', '6'),
('1', '18');

INSERT INTO "tournament_has_user" ("tournament_id", "user_id") VALUES
  ('2', '16'),
  ('3', '5'),
  ('5', '26');

COMMIT;
