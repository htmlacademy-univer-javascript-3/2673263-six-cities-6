import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectAuthorizationStatus,
  selectUserEmail,
  selectFavoritesCount,
} from '../../store/selectors';
import { logoutAction } from '../../store/api-actions';

type HeaderProps = {
  isMainPage?: boolean;
};

function Header({ isMainPage = false }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userEmail = useAppSelector(selectUserEmail);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const handleSignOutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction())
      .unwrap()
      .then(() => navigate(AppRoute.Main))
      .catch(() => {
      });
  };

  const logoClassName = `header__logo-link${
    isMainPage ? ' header__logo-link--active' : ''
  }`;

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={logoClassName} to={AppRoute.Main}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">
                        {userEmail}
                      </span>
                      <span className="header__favorite-count">
                        {favoritesCount}
                      </span>
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={handleSignOutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
