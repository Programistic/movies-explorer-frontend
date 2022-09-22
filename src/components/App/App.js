import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

import './App.css';

function App() {
  return (
    <div className="page">
      <div className="container">
        <Header />
        <Promo />
        <NavTab />
      </div>
    </div>
  );
}

export default App;
