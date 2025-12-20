import { render, screen } from '@testing-library/react';
import Header from './header';
import { AuthorizationStatus } from '../../const';
import { vi } from 'vitest';
import {
  selectAuthorizationStatus,
  selectFavoritesCount,
  selectUserAvatarUrl,
  selectUserEmail,
} from '../../store/selectors';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../../hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: unknown) => {
    if (selector === selectAuthorizationStatus) {
      return AuthorizationStatus.NoAuth;
    }
    if (selector === selectUserEmail) {
      return null;
    }
    if (selector === selectUserAvatarUrl) {
      return null;
    }
    if (selector === selectFavoritesCount) {
      return 0;
    }
    return null;
  },
}));

describe('Component: Header', () => {
  it('should render "Sign in" when user is not authorized', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user info when user is authorized', async () => {
    const hooks = await import('../../hooks');
    vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector: unknown) => {
      if (selector === selectAuthorizationStatus) {
        return AuthorizationStatus.Auth;
      }
      if (selector === selectUserEmail) {
        return 'test@test.ru';
      }
      if (selector === selectUserAvatarUrl) {
        return 'img/avatar.jpg';
      }
      if (selector === selectFavoritesCount) {
        return 5;
      }
      return null;
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('test@test.ru')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
