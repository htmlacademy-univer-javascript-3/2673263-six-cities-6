import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { Offer } from '../../types/offer';
import OfferCard from './offer-card';
import { AuthorizationStatus, AppRoute } from '../../const';
import * as hooks from '../../hooks';

const dispatchMock = vi.fn<[unknown], unknown>();
const navigateMock = vi.fn();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const toggleFavoriteActionMock = vi.fn((payload: unknown) => ({
  type: 'data/toggleFavorite',
  payload,
}));

vi.mock('../../store/api-actions', () => ({
  toggleFavoriteAction: (payload: unknown) => toggleFavoriteActionMock(payload),
}));

const makeOffer = (overrides: Partial<Offer> = {}): Offer =>
  ({
    id: '1',
    title: 'Test title',
    type: 'apartment',
    price: 100,
    rating: 4,
    isPremium: true,
    isFavorite: false,
    images: ['img.jpg'],
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    goods: [],
    host: { isPro: false, name: 'Host', avatarUrl: 'a.jpg' },
    bedrooms: 1,
    maxAdults: 2,
    description: '',
    ...overrides,
  } as Offer);

describe('Component: OfferCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock.mockImplementation((action) => action);

    vi.mocked(hooks.useAppSelector).mockReturnValue(AuthorizationStatus.NoAuth);
  });

  it('should render basic offer info', () => {
    render(
      <MemoryRouter>
        <OfferCard offer={makeOffer()} />
      </MemoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test title');
  });

  it('should navigate to login on bookmark click when user is not authorized', () => {
    vi.mocked(hooks.useAppSelector).mockReturnValue(AuthorizationStatus.NoAuth);

    render(
      <MemoryRouter>
        <OfferCard offer={makeOffer()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(dispatchMock).not.toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('should dispatch toggleFavoriteAction on bookmark click when authorized', () => {
    vi.mocked(hooks.useAppSelector).mockReturnValue(AuthorizationStatus.Auth);

    render(
      <MemoryRouter>
        <OfferCard offer={makeOffer({ isFavorite: false })} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(navigateMock).not.toHaveBeenCalled();

    expect(toggleFavoriteActionMock).toHaveBeenCalledWith({ offerId: '1', isFavorite: true });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });
});
