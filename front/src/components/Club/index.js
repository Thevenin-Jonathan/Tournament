import clublogo from 'src/assets/logo-bayard-bad-blanc.png';

function Club() {
  return (
    <main className="content club">
      <h1 className="title">Profil du club</h1>

      <div className="club-card">
        <h2 className="club-name">Bayard Bad</h2>
        <img className="club-avatar" src={clublogo} alt="Logo du club" />
        <ul>
          <li>Nombre de membres :<span>92</span></li>
          <li>Adresse :<span>175 avenue de Paris 35000 Rennes</span></li>
          <li>Contact :<span>bayardclub@free.fr</span><span>01 23 45 67 89</span></li>
          <li>Site internet : <span>www.bayardclub.com</span></li>
          <li>Description :
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
              ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa,
              varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy
              molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
              Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
              Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
              Cras vestibulum bibendum augue. Praesent egestas leo in pede.
            </span>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Club;
