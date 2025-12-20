import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OfferPage from './offer-page';
import * as hooks from '../../hooks';
import type { Offer } from '../../types/offer';
import { AuthorizationStatus, AppRoute } from '../../const';
import {
  fetchOffer,
  fetchNearbyOffers,
  fetchComments,
  toggleFavoriteAction,
} from '../../store/api-actions';

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
    useParams: () => ({ id: '1' }),
  };
});

vi.mock('../../store/api-actions', () => ({
  fetchOffer: vi.fn((id: string) => ({ type: 'offer/fetch', payload: id })),
  fetchNearbyOffers: vi.fn((id: string) => ({ type: 'nearby/fetch', payload: id })),
  fetchComments: vi.fn((id: string) => ({ type: 'comments/fetch', payload: id })),
  toggleFavoriteAction: vi.fn((payload: unknown) => ({ type: 'favorite/toggle', payload })),
}));

vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));
vi.mock('../../components/spinner/spinner', () => ({
  default: () => <div data-testid="spinner">Spinner</div>,
}));
vi.mock('../../components/reviews-list/reviews-list', () => ({
  default: () => <div data-testid="reviews">Reviews</div>,
}));
vi.mock('../../components/review-form/review-form', () => ({
  default: () => <div data-testid="review-form">ReviewForm</div>,
}));
vi.mock('../../components/map/map', () => ({
  default: () => <div data-testid="map">Map</div>,
}));
vi.mock('../../components/nearby-offers-list/nearby-offers-list', () => ({
  default: () => <div data-testid="nearby">Nearby</div>,
}));
vi.mock('../not-found-page/not-found-page', () => ({
  default: () => <div data-testid="not-found">NotFound</div>,
}));

const makeOffer = (overrides: Partial<Offer> = {}): Offer =>
  ({
    id: '1',
    title: 'Offer title',
    isPremium: true,
    isFavorite: false,
    rating: 4.5,
    type: 'apartment',
    bedrooms: 2,
    maxAdults: 3,
    price: 100,
    images: ['a.jpg'],
    goods: ['Wifi'],
    description: 'Desc',
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    host: { isPro: true, name: 'Host', avatarUrl: 'h.jpg' },
    ...overrides,
  } as Offer);

describe('Page: OfferPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock.mockImplementation((action) => action);
  });

  it('should dispatch fetchOffer/fetchNearbyOffers/fetchComments on mount when id exists', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(makeOffer())
      .mockReturnValueOnce(false)
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(AuthorizationStatus.NoAuth);

    render(<OfferPage />);

    expect(fetchOffer).toHaveBeenCalledWith('1');
    expect(fetchNearbyOffers).toHaveBeenCalledWith('1');
    expect(fetchComments).toHaveBeenCalledWith('1');
    expect(dispatchMock).toHaveBeenCalledTimes(3);
  });

  it('should render spinner when current offer is loading', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(true);

    render(<OfferPage />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render NotFound when currentOffer is null and not loading', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(false);

    render(<OfferPage />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('should navigate to login when bookmark clicked and user is not authorized', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(makeOffer({ isFavorite: false }))
      .mockReturnValueOnce(false)
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(AuthorizationStatus.NoAuth);

    render(<OfferPage />);

    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);

    expect(navigateMock).toHaveBeenCalledWith(AppRoute.Login);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
  });

  it('should dispatch toggleFavoriteAction when authorized and bookmark clicked', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(makeOffer({ id: '1', isFavorite: false }))
      .mockReturnValueOnce(false)
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(AuthorizationStatus.Auth);

    render(<OfferPage />);

    fireEvent.click(screen.getByRole('button'));

    expect(toggleFavoriteAction).toHaveBeenCalledWith({ offerId: '1', isFavorite: true });
  });
});
