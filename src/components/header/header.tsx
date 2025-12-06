import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectAuthorizationStatus,
  selectFavoritesCount,
  selectUserAvatarUrl,
  selectUserEmail,
} from '../../store/selectors';
import { logoutAction } from '../../store/api-actions';

type HeaderProps = {
  isMainPage?: boolean;
};

function Header({ isMainPage }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userEmail = useAppSelector(selectUserEmail);
  const userAvatarUrl = useAppSelector(selectUserAvatarUrl);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleSignOutClick = () => {
    dispatch(logoutAction())
      .unwrap()
      .then(() => {
        navigate(AppRoute.Main);
      })
      .catch(() => {});
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link${
                isMainPage ? ' header__logo-link--active' : ''
              }`}
              to={AppRoute.Main}
            >
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
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        {userAvatarUrl && (
                          <img
                            className="header__avatar user__avatar"
                            src={userAvatarUrl}
                            width={20}
                            height={20}
                            alt="User avatar"
                          />
                        )}
                      </div>
                      <span className="header__user-name user__name">
                        {userEmail}
                      </span>
                      <span className="header__favorite-count">
                        {favoritesCount}
                      </span>
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <button
                      className="header__nav-link button"
                      type="button"
                      onClick={handleSignOutClick}
                      style={{ border: 'none', background: 'none', padding: 0 }}
                    >
                      <span className="header__signout">Sign out</span>
                    </button>
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
