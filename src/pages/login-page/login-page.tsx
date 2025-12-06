import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/selectors';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!email || !password.trim()) {
      return;
    }

    dispatch(loginAction({ email, password }))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Main);
      })
      .catch(() => {
      });
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  id="email"
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  required
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  id="password"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
              </div>

              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
