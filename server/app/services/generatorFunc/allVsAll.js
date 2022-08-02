// LA méga fonction qui build le ALL vs ALL en fournissant juste un tableau d'équipe !
function buildAllVsAllTournament(teamArray){
  // initialisation de valeurs sur le tableau des joueurs fournis
  let teamCount = countTeams(teamArray);
  let realPhaseCount = countPhase(teamArray);
  // si le nombre de team est impaire
  // j'ajoute 1 équipe fantome pour simplifier les calculs
  // l'equipe qui joue contre l'équipe fantome dans une phase, en fait elle se repose :)
  if(teamCount%2) {
      teamCount++;
  }

  // création d'un tableau de valeurs numériques égale au nombre de team
  // ex : teams = [1, 2, 3, 4, 5, 6]
  const teams = [...Array(teamCount+1).keys()].slice(1);

  // liste temporaire des joueurs, copiée depuis l'originale
  const availableTeams 	= [...teams];

  // le pivot fixe sera la dernière team de la liste
  const pivotTeam = availableTeams[teamCount - 1];

  // initialisation des tableaux
  const tournament = [];
  const phase = [];

  // ////////////
  // ETAPE 1
  // ////////////
  // creation de la premiere journée
  // toujours identique : on assemble les premieres et dernieres team
  // puis on décale vers le centre

  // Autant de fois que de matchs simultanés possibles
  for (let i = 0; i < (teamCount / 2) ; i++) {
      // insertion des matchs de la premiere phase
      phase.push( [availableTeams[i],availableTeams[availableTeams.length-i-1]] );
  }
  // insertion de la premiere phase dans le tournoi
  tournament.push(phase);

  // Toutes les teams, sans le pivot
  const availableTeamsWithoutPivot = [...availableTeams];
  availableTeamsWithoutPivot.pop();

  // ////////////
  // ETAPE 2
  // ////////////
  // Boucle tant que le tournoi ne contient pas toutes ses phases
  let currentPhase = 0;
  while (tournament.length < realPhaseCount) {
      // La premiere phase est déja dans le tournoi
      // pour créer la suivante on lit la précédente et on fait tourner les teams autour du pivot
      // --> si le match de la phase précédente est [1,2] alors le match suivant est [2,3]
      // on cherche la team suivante avec la fonction nextTeam
      // cas particulier : une des team du match est la team pivot --> on la laise
      // il garde toujours la meme place (team 2 par ex)
      // --> si le match de la phase précédente est [3,6], ou 6 est la team pivot alors le match suivant est [4,6]

      const newPhase = [];
      // pour chaque match de la phase précédente :
      tournament[currentPhase].forEach(match => {
          // je crée un nouveau match basé sur le match courrant,
          // je vais simplement chercher la team suivante
          let team1 = match[0];
          let team2 = match[1];

          team1 = findNextTeam(team1, availableTeamsWithoutPivot);
          if(team2 !== pivotTeam) {
              team2 = findNextTeam(team2, availableTeamsWithoutPivot);
          }

          const newMatch = [team1, team2];
          // insertion du match dans la phase en cours
          newPhase.push(newMatch);
      });
      // insertion de la phase en cours dans le tournoi
      tournament.push(newPhase);
      // phase suivante
      currentPhase++;
  }

  return tournament;
}



////////////////////////////
// MATHS ET UTILITAIRES
// un peu de maths ! Retour à la terminale :)
////////////////////////////

// Fonctions simples
function countTeams(teamArray) {
  return teamArray.length;
}

function listTeams(teamArray) {
  return teamArray.join(', ');
}

function countPhase(teamArray) {
  const teamCount = teamArray.length;
  if(teamCount % 2 === 1) {
      return teamCount;
  } else {
      return teamCount - 1;
  }
}

/**
* Fonction qui parcours un tableau fourni et renvoit l'element suivant celui fourni
* Si l'élément fourni se trouve en derniere place, on reprend le tableau à la premiere case
* @param {number} currentTeam est l'item recherché
* @param {array} teamList est le tableau qu'on parcours
* @returns le prochain item du tableau de manière cyclique
* ex: (2, [1, 2, 3, 4]) --> 3
* ex: (6, [1, 2, 3, 4, 5, 6]) --> 1
*/
function findNextTeam(currentTeam, teamList) {
  // on bloque direct si les données passées sont incohérentes
  if(
      typeof(currentTeam) !== 'number' ||
      typeof(teamList) !== 'object' ||
      teamList.length < 2 ||
      currentTeam > teamList.length ||
      currentTeam < 0
  ) {
      return 'Erreur, données fournies incohérentes...';
  }
  // si la currentTeam fournie n'est pas la derniere de la liste fournie
  if(currentTeam !== teamList[teamList.length-1]) {
      // trouver la team dans la liste
      const findedTeamIndex = teamList.findIndex( (elem) => elem === currentTeam );
      const nextTeamIndex = findedTeamIndex + 1;
      const findedTeam = teamList[nextTeamIndex];
      return findedTeam;
  // sinon on renvoit le premier
  } else {
      return teamList[0];
  }
}


// calculer une factorielle : n!
// ex : 4! = 1 × 2 × 3 × 4 = 24
// https://fr.wikipedia.org/wiki/Factorielle
function factorielle(n){
  let f = 1;
  for(let i = 1 ; i <= n ; i++){
      f *= i;
  }
  return f;
}

// calculer une combinatoire
// https://calculis.net/arrangement
// formule : comb(p,n) = n! / (p! x (n-p)!)
function combinatoire(n,p){
  const c = factorielle(n) / ( factorielle(p) * factorielle(n-p) );
  return c;
}

// dénombrer tous les matches differents possibles
// au badminton un match ne compte que 2 équipes
// on calcul donc la combinatoire du total de joueurs par assemblage de 2
function countMatches(teamArray){
  const teamCount = countTeams(teamArray);
  return combinatoire(teamCount,2);
}

// calculer le nombre de matchs simultanés possibles
// au badminton un match ne compte que 2 équipes
// on prend le nombre de joueurs qu'on divise par 2
// on arrondi à l'entier inférieur
function countSimMatches(teamArray){
  const teamCount = countTeams(teamArray);
  return Math.floor(teamCount / 2);
}

module.exports = buildAllVsAllTournament;