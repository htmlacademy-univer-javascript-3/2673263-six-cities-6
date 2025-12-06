import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return children;
  }

  return <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
