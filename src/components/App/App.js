import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="page">
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Header path="/" loggedIn={false}/>
            <Main />
            <Footer />
          </Route>
          <Route exact path="/movies">
            <Header path="/movies" loggedIn={true}/>
            <Movies />
            <Footer />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
