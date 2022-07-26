import { Link } from 'react-router-dom';
import fakeHome from 'src/assets/img/static-home.png';

function Home() {
  return (
    <main className="home content">
      <Link to="/connexion" className="link" style={{ backgroundImage: `url(${fakeHome})` }} />
    </main>
  );
}

export default Home;
