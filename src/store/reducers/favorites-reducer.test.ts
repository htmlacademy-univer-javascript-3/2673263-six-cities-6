import '@testing-library/jest-dom/vitest';
import { favoritesReducer, initialFavoritesState } from './favorites-reducer';
import { fillOffer } from '../action';
import type { City, Offer } from '../../types/offer';

const city: City = { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } };

const makeOffer = (id: string, isFavorite: boolean): Offer => ({
  id,
  title: 't',
  description: 'd',
  type: 'hotel',
  price: 100,
  images: [],
  city,
  location: { latitude: 0, longitude: 0, zoom: 10 },
  goods: [],
  host: { isPro: false, name: 'Host', avatarUrl: 'img/avatar.jpg' },
  isPremium: false,
  isFavorite,
  rating: 4,
  bedrooms: 1,
  maxAdults: 2,
});

describe('favoritesReducer', () => {
  it('should return initial state with empty action', () => {
    const result = favoritesReducer(undefined, { type: 'UNKNOWN_ACTION' } as never);
    expect(result).toEqual(initialFavoritesState);
  });

  it('should keep only favorites on fillOffer', () => {
    const favoriteOffer = makeOffer('1', true);
    const notFavoriteOffer = makeOffer('2', false);

    const result = favoritesReducer(
      initialFavoritesState,
      fillOffer([favoriteOffer, notFavoriteOffer])
    );

    expect(result.favorites).toEqual([favoriteOffer]);
  });

  it('should return current state for unknown action', () => {
    const state = { ...initialFavoritesState, favorites: [makeOffer('1', true)] };
    const result = favoritesReducer(state, { type: 'UNKNOWN_ACTION' } as never);
    expect(result).toEqual(state);
  });
});
