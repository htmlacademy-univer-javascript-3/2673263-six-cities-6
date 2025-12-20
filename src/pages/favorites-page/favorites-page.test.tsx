import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FavoritesPage from './favorites-page';
import type { Offer } from '../../types/offer';
import * as hooks from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-actions';

const dispatchMock = vi.fn<[unknown], unknown>();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/api-actions', () => ({
  fetchFavoritesAction: vi.fn(() => ({ type: 'favorites/fetch' })),
}));

vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/offer-card/offer-card', () => ({
  default: ({ offer }: { offer: Offer }) => (
    <div data-testid="offer-card">{offer.id}</div>
  ),
}));

const makeOffer = (id: string, cityName = 'Paris', isFavorite = true): Offer =>
  ({
    id,
    isFavorite,
    city: { name: cityName, location: { latitude: 0, longitude: 0, zoom: 10 } },
  } as Offer);

describe('Page: FavoritesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock.mockImplementation((action) => action);
  });

  it('should dispatch fetchFavoritesAction on mount', () => {
    vi.mocked(hooks.useAppSelector).mockReturnValue([]);

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(fetchFavoritesAction).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it('should render empty state when no favorites', () => {
    vi.mocked(hooks.useAppSelector).mockReturnValue([]);

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render grouped favorites when favorites exist', () => {
    vi.mocked(hooks.useAppSelector).mockReturnValue([
      makeOffer('1', 'Paris', true),
      makeOffer('2', 'Paris', true),
      makeOffer('3', 'Amsterdam', true),
    ]);

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getAllByTestId('offer-card')).toHaveLength(3);
  });
});
