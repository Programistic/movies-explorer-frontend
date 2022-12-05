import { useHistory } from 'react-router-dom';

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useHistory();

    return (
      <Component
        history={history}
        {...props}
        />
    );
  };

  return Wrapper;
};

export default withRouter;
