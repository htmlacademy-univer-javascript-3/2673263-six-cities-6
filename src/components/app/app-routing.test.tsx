import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, vi } from 'vitest';
import App from './app';
import { AuthorizationStatus, AppRoute } from '../../const';
import { selectAuthorizationStatus } from '../../store/selectors';

vi.mock('../../pages/main-page/main-page', () => ({
  default: () => <div>MAIN_PAGE</div>,
}));

vi.mock('../../pages/login-page/login-page', () => ({
  default: () => <div>LOGIN_PAGE</div>,
}));

vi.mock('../../pages/favorites-page/favorites-page.tsx', () => ({
  default: () => <div>FAVORITES_PAGE</div>,
}));

vi.mock('../../pages/offer-page/offer-page.tsx', () => ({
  default: () => <div>OFFER_PAGE</div>,
}));

vi.mock('../../pages/not-found-page/not-found-page.tsx', () => ({
  default: () => <div>NOT_FOUND_PAGE</div>,
}));

vi.mock('../spinner/spinner.tsx', () => ({
  default: () => <div>SPINNER</div>,
}));

let mockAuthStatus: AuthorizationStatus = AuthorizationStatus.NoAuth;

const mockDispatch = vi.fn();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: unknown) => {
    if (selector === selectAuthorizationStatus) {
      return mockAuthStatus;
    }
    return null;
  },
}));

const setRoute = (path: string) => {
  window.history.pushState({}, '', path);
};

describe('App routing', () => {
  beforeEach(() => {
    mockAuthStatus = AuthorizationStatus.NoAuth;
    mockDispatch.mockClear();
  });

  it('should render Spinner when auth status is Unknown', () => {
    mockAuthStatus = AuthorizationStatus.Unknown;
    setRoute(AppRoute.Main);

    render(<App />);

    expect(screen.getByText('SPINNER')).toBeInTheDocument();
  });

  it('should render MainPage on "/"', () => {
    setRoute(AppRoute.Main);

    render(<App />);

    expect(screen.getByText('MAIN_PAGE')).toBeInTheDocument();
  });

  it('should render LoginPage on "/login"', () => {
    setRoute(AppRoute.Login);

    render(<App />);

    expect(screen.getByText('LOGIN_PAGE')).toBeInTheDocument();
  });

  it('should redirect to LoginPage from "/favorites" when user is not authorized', async () => {
    mockAuthStatus = AuthorizationStatus.NoAuth;
    setRoute(AppRoute.Favorites);

    render(<App />);

    expect(await screen.findByText('LOGIN_PAGE')).toBeInTheDocument();
  });

  it('should render FavoritesPage on "/favorites" when user is authorized', () => {
    mockAuthStatus = AuthorizationStatus.Auth;
    setRoute(AppRoute.Favorites);

    render(<App />);

    expect(screen.getByText('FAVORITES_PAGE')).toBeInTheDocument();
  });

  it('should render OfferPage on "/offer/:id"', () => {
    setRoute(`${AppRoute.Offer}/123`);

    render(<App />);

    expect(screen.getByText('OFFER_PAGE')).toBeInTheDocument();
  });

  it('should render NotFoundPage on unknown route', () => {
    setRoute('/unknown-route');

    render(<App />);

    expect(screen.getByText('NOT_FOUND_PAGE')).toBeInTheDocument();
  });
});
