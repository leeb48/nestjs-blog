import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteProps, Redirect, Route } from 'react-router-dom';
import { getUser } from '../../actions';
import { AppState } from '../../store';

interface PrivateRouteProps extends RouteProps {
  compoment: React.FC<any>;
  path: string;
  exact: boolean;

  getUser: () => void;
  isAuthenticated: boolean;
}

const PrivateRoute = ({
  compoment,
  path,
  exact,
  getUser,
  isAuthenticated,
}: PrivateRouteProps) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return isAuthenticated ? (
    <Route path={path} exact={exact} component={compoment} />
  ) : (
    <Redirect to="/login" />
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getUser })(PrivateRoute);
