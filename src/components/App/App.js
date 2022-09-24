import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';

import './App.css';

function App() {
  return (
    <div className="page">
      <div className="container">
        <Header />
        <Promo />
        <NavTab />
        <AboutProject />
      </div>
    </div>
  );
}

export default App;
