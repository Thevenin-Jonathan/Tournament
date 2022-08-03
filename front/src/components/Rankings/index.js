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

  // Ajout dans 'stats' pour chaque membre des % de victoires pour chaque discipline
  const addSingleVictoriesRates = (
    stats.map((memberStats) => (
      Object.defineProperty(memberStats, 'singleVictoriesRate', {
        value: memberStats.stat_won_single * 100 / memberStats.stat_single_played,
      })
    ))
  );
  const addDoubleVictoriesRates = (
    addSingleVictoriesRates.map((memberStats) => (
      Object.defineProperty(memberStats, 'doubleVictoriesRate', {
        value: memberStats.stat_won_double * 100 / memberStats.stat_double_played,
      })
    ))
  );
  const statsWithVictoriesRates = (
    addDoubleVictoriesRates.map((memberStats) => (
      Object.defineProperty(memberStats, 'mixVictoriesRate', {
        value: memberStats.stat_won_mix * 100 / memberStats.stat_mix_played,
      })
    ))
  );
  // console.log(statsWithVictoriesRates);

  // Filtre les hommes, tri par % victoires en simple
  const men = (
    statsWithVictoriesRates.filter((member) => (
      member.gender_id === 1
    ))
  ).sort((a, b) => {
    if (a.singleVictoriesRate < b.singleVictoriesRate) {
      return -1;
    }
    if (a.singleVictoriesRate > b.singleVictoriesRate) {
      return 1;
    }
    return 0;
  });

  // Filtre les dames
  const women = statsWithVictoriesRates.filter((member) => (
    member.gender_id === 2
  ));

  return (
    <main className="rankings content">

      <div className="rankings-list">
        <h1 className="title">Classements</h1>

        <section> {/* Classement Simple Messieurs */}
          <h2 className="title-h2">Classement Général</h2>
          <table>
            <tbody>
              <tr>
                <th>Rang</th>
                <th>Nom</th>
                <th>Matchs joués</th>
                <th>Matchs gagnés</th>
                <th>% victoires</th>
              </tr>
              {statsWithVictoriesRates.map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.stat_single_played}</td>
                  <td>{memberStats.stat_won_single}</td>
                  <td>{memberStats.singleVictoriesRate} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
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
              {men.map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.stat_single_played}</td>
                  <td>{memberStats.stat_won_single}</td>
                  <td>{memberStats.singleVictoriesRate} %</td>
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
              {women.map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.stat_single_played}</td>
                  <td>{memberStats.stat_won_single}</td>
                  <td>{memberStats.singleVictoriesRate} %</td>
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
              {men.map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.stat_double_played}</td>
                  <td>{memberStats.stat_won_double}</td>
                  <td>{memberStats.doubleVictoriesRate} %</td>
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
              {women.map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.stat_double_played}</td>
                  <td>{memberStats.stat_won_double}</td>
                  <td>{memberStats.doubleVictoriesRate} %</td>
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
              {statsWithVictoriesRates.map((memberStats) => (
                <tr key={memberStats.id}>
                  <td>1</td>
                  <td>{memberStats.lastname.toUpperCase()} {memberStats.firstname}</td>
                  <td>{memberStats.stat_mix_played}</td>
                  <td>{memberStats.stat_won_mix}</td>
                  <td>{memberStats.mixVictoriesRate} %</td>
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
            // onChange={(e) => changeRanking(e.target.value)}
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
