import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import PrivateRoute from './private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/selectors';

let mockAuthStatus: AuthorizationStatus = AuthorizationStatus.NoAuth;

vi.mock('../../hooks', () => ({
  useAppSelector: (selector: unknown) => {
    if (selector === selectAuthorizationStatus) {
      return mockAuthStatus;
    }
    return null;
  },
}));

describe('Component: PrivateRoute', () => {
  it('should redirect to /login when user is not authorized', () => {
    mockAuthStatus = AuthorizationStatus.NoAuth;

    render(
      <MemoryRouter initialEntries={[AppRoute.Favorites]}>
        <Routes>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <div>PRIVATE</div>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<div>LOGIN</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });

  it('should render children when user is authorized', () => {
    mockAuthStatus = AuthorizationStatus.Auth;

    render(
      <MemoryRouter initialEntries={[AppRoute.Favorites]}>
        <Routes>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <div>PRIVATE</div>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<div>LOGIN</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('PRIVATE')).toBeInTheDocument();
  });
});
