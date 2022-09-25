import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Profile from '../Profile/Profile';
import Portfolio from '../Portfolio/Portfolio';

import './App.css';
import Techs from '../Techs/Techs';

function App() {
  return (
    <div className="page">
      <div className="container">
        <Header />
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <Profile />
        <Portfolio />
      </div>
    </div>
  );
}

export default App;
