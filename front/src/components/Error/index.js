import cat404 from 'src/assets/img/404-bad-cat.png';

function Error() {
  return (
    <main className="app-error content">
      <h1 className="title">Erreur 404 🙀</h1>
      <p>Manifestement vous etes perdu...</p>

      <img src={cat404} alt="Chapristi!" className="cat-404" />
    </main>
  );
}

export default Error;
