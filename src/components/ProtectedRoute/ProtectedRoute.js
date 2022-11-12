import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { LoggedInContext } from '../../contexts/LoggedInContext';

function ProtectedRoute({ children }) {
  const loggedIn = useContext(LoggedInContext);
  return (
    <Route>
      {
        () => (loggedIn ? children : <Redirect to="/" />)
      }
    </Route>
  );
}

export default ProtectedRoute;
