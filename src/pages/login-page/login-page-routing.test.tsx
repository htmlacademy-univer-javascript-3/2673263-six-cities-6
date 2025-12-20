import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, vi } from 'vitest';
import App from '../../components/app/app';
import { AuthorizationStatus, AppRoute } from '../../const';
import { selectAuthorizationStatus } from '../../store/selectors';

vi.mock('../main-page/main-page', () => ({
  default: () => <div>MAIN_PAGE</div>,
}));

vi.mock('../favorites-page/favorites-page.tsx', () => ({
  default: () => <div>FAVORITES_PAGE</div>,
}));

vi.mock('../offer-page/offer-page.tsx', () => ({
  default: () => <div>OFFER_PAGE</div>,
}));

vi.mock('../not-found-page/not-found-page.tsx', () => ({
  default: () => <div>NOT_FOUND_PAGE</div>,
}));

vi.mock('../../components/spinner/spinner.tsx', () => ({
  default: () => <div>SPINNER</div>,
}));

vi.mock('../../store/api-actions.ts', () => ({
  checkAuthAction: () => ({ type: 'user/checkAuth' }),
  fetchOffers: () => ({ type: 'data/fetchOffers' }),
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

describe('LoginPage routing', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockAuthStatus = AuthorizationStatus.Auth;
  });

  it('should redirect from "/login" to "/" when user is authorized', async () => {
    setRoute(AppRoute.Login);

    render(<App />);

    expect(await screen.findByText('MAIN_PAGE')).toBeInTheDocument();
  });
});
