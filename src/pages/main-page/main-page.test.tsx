import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPage from './main-page';
import type { City, Offer } from '../../types/offer';
import * as hooks from '../../hooks';
import { SortingOptionVariants } from '../../const';
import { changeCity, changeSorting } from '../../store/action';

const dispatchMock = vi.fn<[unknown], unknown>();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/action', () => ({
  changeCity: vi.fn((payload: unknown) => ({ type: 'city/change', payload })),
  changeSorting: vi.fn((payload: unknown) => ({ type: 'sorting/change', payload })),
}));

vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/cities-list/cities-list', () => ({
  default: ({ onCityClick }: { onCityClick: (city: City) => void }) => (
    <button
      type="button"
      onClick={() =>
        onCityClick({ name: 'Amsterdam', location: { latitude: 0, longitude: 0, zoom: 10 } })}

    >
      CitiesListMock
    </button>
  ),
}));

vi.mock('../../components/sorting-options/sorting-options', () => ({
  default: ({ onChange }: { onChange: (v: SortingOptionVariants) => void }) => (
    <button type="button" onClick={() => onChange(SortingOptionVariants.PriceLowToHigh)}>
      SortingOptionsMock
    </button>
  ),
}));

vi.mock('../../components/offers-list/offers-list', () => ({
  default: () => <div data-testid="offers-list">OffersList</div>,
}));

vi.mock('../../components/map/map', () => ({
  default: () => <div data-testid="map">Map</div>,
}));

vi.mock('../../components/spinner/spinner', () => ({
  default: () => <div data-testid="spinner">Spinner</div>,
}));

vi.mock('./main-page-empty', () => ({
  default: ({ city }: { city: City }) => <div data-testid="empty">Empty: {city.name}</div>,
}));

const makeCity = (name: string): City => ({
  name,
  location: { latitude: 0, longitude: 0, zoom: 10 },
});

const makeOffer = (id: string): Offer =>
  ({
    id,
    city: makeCity('Paris'),
    location: { latitude: 0, longitude: 0, zoom: 10 },
  } as Offer);

describe('Page: MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock.mockImplementation((action) => action);
  });

  it('should render spinner when offers are loading', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(makeCity('Paris')) // city
      .mockReturnValueOnce([]) // offers
      .mockReturnValueOnce(SortingOptionVariants.Popular) // sorting
      .mockReturnValueOnce(true); // isOffersLoading

    render(<MainPage />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render empty state when no offers and not loading', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(makeCity('Paris')) // city
      .mockReturnValueOnce([]) // offers
      .mockReturnValueOnce(SortingOptionVariants.Popular) // sorting
      .mockReturnValueOnce(false); // isOffersLoading

    render(<MainPage />);

    expect(screen.getByTestId('empty')).toHaveTextContent('Empty: Paris');
  });

  it('should render offers content when offers exist', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(makeCity('Paris')) // city
      .mockReturnValueOnce([makeOffer('1'), makeOffer('2')]) // offers
      .mockReturnValueOnce(SortingOptionVariants.Popular) // sorting
      .mockReturnValueOnce(false); // isOffersLoading

    render(<MainPage />);

    expect(screen.getByText(/2 places to stay in Paris/i)).toBeInTheDocument();
    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should dispatch changeCity on city click', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(makeCity('Paris'))
      .mockReturnValueOnce([makeOffer('1')])
      .mockReturnValueOnce(SortingOptionVariants.Popular)
      .mockReturnValueOnce(false);

    render(<MainPage />);

    fireEvent.click(screen.getByRole('button', { name: 'CitiesListMock' }));

    expect(changeCity).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it('should dispatch changeSorting on sorting change', () => {
    vi.mocked(hooks.useAppSelector)
      .mockReturnValueOnce(makeCity('Paris'))
      .mockReturnValueOnce([makeOffer('1')])
      .mockReturnValueOnce(SortingOptionVariants.Popular)
      .mockReturnValueOnce(false);

    render(<MainPage />);

    fireEvent.click(screen.getByRole('button', { name: 'SortingOptionsMock' }));

    expect(changeSorting).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });
});
