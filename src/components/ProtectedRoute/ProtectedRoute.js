import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...props }) => (
    <Route>
      {
        () => (props.loggedIn ? children : <Redirect to="/" />)
      }
    </Route>
  );

export default ProtectedRoute;
