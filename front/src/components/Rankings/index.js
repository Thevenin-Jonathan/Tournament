import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import disciplineText from 'src/utils';

function Rankings() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => (state.stats.stats));
  useEffect(() => {
    dispatch({
      type: 'GET_STATS',
    });
  }, []);

  // Filtre les hommes
  const men = stats.filter((member) => (
    member.gender_id === 1
  ));
  // Filtre les dames
  const women = stats.filter((member) => (
    member.gender_id === 2
  ));

  // Fonction pour trier par % de victoire en SIMPLE HOMME
  const sortByPercentWinSingleMen = (category) => (
    category.sort((a, b) => {
      if (a.single_men[0].percent_win < b.single_men[0].percent_win) {
        return 1;
      }
      if (a.single_men[0].percent_win > b.single_men[0].percent_win) {
        return -1;
      }
      return 0;
    })
  );

  // Fonction pour trier par % de victoire en SIMPLE FEMME
  const sortByPercentWinSingleWomen = (category) => (
    category.sort((a, b) => {
      if (a.single_women[0].percent_win < b.single_women[0].percent_win) {
        return 1;
      }
      if (a.single_women[0].percent_win > b.single_women[0].percent_win) {
        return -1;
      }
      return 0;
    })
  );

  // Fonction pour trier par % de victoire en DOUBLE HOMME
  const sortByPercentWinDoubleMen = (category) => (
    category.sort((a, b) => {
      if (a.double_men[0].percent_win < b.double_men[0].percent_win) {
        return 1;
      }
      if (a.double_men[0].percent_win > b.double_men[0].percent_win) {
        return -1;
      }
      return 0;
    })
  );

  // Fonction pour trier par % de victoire en DOUBLE FEMME
  const sortByPercentWinDoubleWomen = (category) => (
    category.sort((a, b) => {
      if (a.double_women[0].percent_win < b.double_women[0].percent_win) {
        return 1;
      }
      if (a.double_women[0].percent_win > b.double_women[0].percent_win) {
        return -1;
      }
      return 0;
    })
  );

  // Fonction pour trier par % de victoire en DOUBLE MIXTE
  const sortByPercentWinDoubleMixed = (category) => (
    category.sort((a, b) => {
      if (a.double_mixed[0].percent_win < b.double_mixed[0].percent_win) {
        return 1;
      }
      if (a.double_mixed[0].percent_win > b.double_mixed[0].percent_win) {
        return -1;
      }
      return 0;
    })
  );

  const changeRanking = (toto) => {
    console.log('toto :', toto);
  };
  // console.log(changeRanking());

  return (
    <main className="rankings content">

      <div className="rankings-list">
        <h1 className="title">Classements</h1>

        <section> {/* Classement Simple Messieurs */}
          <h2 className="title-h2">Classement Simple Messieurs</h2>
          <table>
            <tbody>
              <tr>
                <th>Rang</th>
                <th>Nom</th>
                <th>Matchs joués</th>
                <th>Matchs gagnés</th>
                <th>% victoires</th>
              </tr>
              {sortByPercentWinSingleMen(men).map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.single_men[0].nb_played}</td>
                  <td>{memberStats.single_men[0].nb_win}</td>
                  <td>{memberStats.single_men[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section> {/* Classement Simple Dames */}
          <h2 className="title-h2">Classement Simple Dames</h2>
          <table>
            <tbody>
              <tr>
                <th>Rang</th>
                <th>Nom</th>
                <th>Matchs joués</th>
                <th>Matchs gagnés</th>
                <th>% victoires</th>
              </tr>
              {sortByPercentWinSingleWomen(women).map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.single_women[0].nb_played}</td>
                  <td>{memberStats.single_women[0].nb_win}</td>
                  <td>{memberStats.single_women[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section> {/* Classement Double Messieurs */}
          <h2 className="title-h2">Classement Double Messieurs</h2>
          <table>
            <tbody>
              <tr>
                <th>Rang</th>
                <th>Nom</th>
                <th>Matchs joués</th>
                <th>Matchs gagnés</th>
                <th>% victoires</th>
              </tr>
              {sortByPercentWinDoubleMen(men).map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.double_men[0].nb_played}</td>
                  <td>{memberStats.double_men[0].nb_win}</td>
                  <td>{memberStats.double_men[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section> {/* Classement Double Dames */}
          <h2 className="title-h2">Classement Double Dames</h2>
          <table>
            <tbody>
              <tr>
                <th>Rang</th>
                <th>Nom</th>
                <th>Matchs joués</th>
                <th>Matchs gagnés</th>
                <th>% victoires</th>
              </tr>
              {sortByPercentWinDoubleWomen(women).map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.double_women[0].nb_played}</td>
                  <td>{memberStats.double_women[0].nb_win}</td>
                  <td>{memberStats.double_women[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section> {/* Classement Double Mixte */}
          <h2 className="title-h2">Classement Double Mixte</h2>
          <table>
            <tbody>
              <tr>
                <th>Rang</th>
                <th>Nom</th>
                <th>Matchs joués</th>
                <th>Matchs gagnés</th>
                <th>% victoires</th>
              </tr>
              {sortByPercentWinDoubleMixed(stats).map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.double_mixed[0].nb_played}</td>
                  <td>{memberStats.double_mixed[0].nb_win}</td>
                  <td>{memberStats.double_mixed[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>

        </section>
      </div>

      <div className="rankings-filter">
        <h2><i className="fa fa-sliders" aria-hidden="true" /> Filtres</h2>
        <h3>Disciplines</h3>
        <ul>
          <li><input type="radio" name="discipline" value="all" />Tous</li>
          {/* <li><input type="radio" name="discipline" value="singleAll" />Simple Général</li> */}
          <li><input
            type="radio"
            name="discipline"
            onChange={(e) => changeRanking(e.target.value)}
          />
            Simple Homme
          </li>
          <li><input type="radio" name="discipline" value="singleWomen" />Simple Dame</li>
          <li><input type="radio" name="discipline" value="doubleMen" />Double Homme</li>
          <li><input type="radio" name="discipline" value="doubleWomen" />Double Dame</li>
          <li><input type="radio" name="discipline" value="doubleMix" />Double Mixte</li>
        </ul>
      </div>
    </main>
  );
}

export default Rankings;
