import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// import disciplineText from 'src/utils';

function Rankings() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => (state.stats.stats));
  useEffect(() => {
    dispatch({
      type: 'GET_STATS',
    });
  }, []);

  console.log(stats);

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

  const [rankingCategory, setRankingCategory] = useState(0);

  return (
    <main className="rankings content">

      <div className="rankings-list">
        <h1 className="title">Classements</h1>

        {/* Classement Simple Messieurs */}
        <section className={rankingCategory === 1 || rankingCategory === 0
          ? 'single-men-ranking' : 'single-men-ranking hide'}
        >
          <h2 className="title-h2">Simple Homme &nbsp;
            <i className="fa fa-male" aria-hidden="true" />
          </h2>
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
                  <td className="row-number"> </td>
                  <td className="member-name">
                    {memberStats.lastname.toUpperCase()} {memberStats.firstname}
                  </td>
                  <td>{memberStats.single_men[0].nb_played}</td>
                  <td>{memberStats.single_men[0].nb_win}</td>
                  <td>{memberStats.single_men[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Classement Simple Dames */}
        <section className={rankingCategory === 2 || rankingCategory === 0
          ? 'single-women-ranking' : 'single-women-ranking hide'}
        >
          <h2 className="title-h2">Simple Dame &nbsp;
            <i className="fa fa-female" aria-hidden="true" />
          </h2>
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
                  <td> </td>
                  <td className="member-name">
                    {memberStats.lastname.toUpperCase()} {memberStats.firstname}
                  </td>
                  <td>{memberStats.single_women[0].nb_played}</td>
                  <td>{memberStats.single_women[0].nb_win}</td>
                  <td>{memberStats.single_women[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Classement Double Messieurs */}
        <section className={rankingCategory === 3 || rankingCategory === 0
          ? 'double-men-ranking' : 'double-men-ranking hide'}
        >
          <h2 className="title-h2">Double Homme &nbsp;
            <i className="fa fa-male" aria-hidden="true" />
            <i className="fa fa-male" aria-hidden="true" />
          </h2>
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
                  <td> </td>
                  <td className="member-name">
                    {memberStats.lastname.toUpperCase()} {memberStats.firstname}
                  </td>
                  <td>{memberStats.double_men[0].nb_played}</td>
                  <td>{memberStats.double_men[0].nb_win}</td>
                  <td>{memberStats.double_men[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Classement Double Dames */}
        <section className={rankingCategory === 4 || rankingCategory === 0
          ? 'double-women-ranking' : 'double-women-ranking hide'}
        >
          <h2 className="title-h2">Double Dame &nbsp;
            <i className="fa fa-female" aria-hidden="true" />
            <i className="fa fa-female" aria-hidden="true" />
          </h2>
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
                  <td> </td>
                  <td className="member-name">
                    {memberStats.lastname.toUpperCase()} {memberStats.firstname}
                  </td>
                  <td>{memberStats.double_women[0].nb_played}</td>
                  <td>{memberStats.double_women[0].nb_win}</td>
                  <td>{memberStats.double_women[0].percent_win} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Classement Double Mixte */}
        <section className={rankingCategory === 5 || rankingCategory === 0
          ? 'double-mixed-ranking' : 'double-mixed-ranking hide'}
        >
          <h2 className="title-h2">Double Mixte &nbsp;
            <i className="fa fa-female" aria-hidden="true" />
            <i className="fa fa-male" aria-hidden="true" />
          </h2>
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
                  <td> </td>
                  <td className="member-name">
                    {memberStats.lastname.toUpperCase()} {memberStats.firstname}
                  </td>
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
          <li><input
            type="radio"
            name="discipline"
            className="0"
            onChange={(e) => setRankingCategory(parseInt(e.target.className, 10))}
            // checked
          />Tous
          </li>
          <li><input
            type="radio"
            name="discipline"
            className="1"
            onChange={(e) => setRankingCategory(parseInt(e.target.className, 10))}
          />
            Simple Homme
          </li>
          <li><input
            type="radio"
            name="discipline"
            className="2"
            onChange={(e) => setRankingCategory(parseInt(e.target.className, 10))}
          />Simple Dame
          </li>
          <li><input
            type="radio"
            name="discipline"
            className="3"
            onChange={(e) => setRankingCategory(parseInt(e.target.className, 10))}
          />
            Double Homme
          </li>
          <li><input
            type="radio"
            name="discipline"
            className="4"
            onChange={(e) => setRankingCategory(parseInt(e.target.className, 10))}
          />
            Double Dame
          </li>
          <li><input
            type="radio"
            name="discipline"
            className="5"
            onChange={(e) => setRankingCategory(parseInt(e.target.className, 10))}
          />
            Double Mixte
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Rankings;
