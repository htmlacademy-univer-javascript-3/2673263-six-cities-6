import { describe, it, expect } from 'vitest';
import { offersReducer, initialOffersState } from './offers-reducer';
import { changeCity, fillOffer, changeSorting, changeOffersLoadingStatus } from '../action';
import { SortingOptionVariants } from '../../const';
import type { City, Offer } from '../../types/offer';

const cityParis: City = { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } };
const cityAmsterdam: City = { name: 'Amsterdam', location: { latitude: 1, longitude: 1, zoom: 10 } };

const baseOffer: Offer = {
  id: '1',
  title: 't',
  description: 'd',
  type: 'apartment',
  price: 100,
  images: [],
  city: cityParis,
  location: { latitude: 0, longitude: 0, zoom: 10 },
  goods: [],
  host: { isPro: false, name: 'Host', avatarUrl: 'img/avatar.jpg' },
  isPremium: false,
  isFavorite: false,
  rating: 4,
  bedrooms: 1,
  maxAdults: 2,
};

describe('offersReducer', () => {
  it('should return initial state with empty action', () => {
    const result = offersReducer(undefined, { type: 'UNKNOWN_ACTION' } as never);
    expect(result).toEqual(initialOffersState);
  });

  it('should change city', () => {
    const result = offersReducer(initialOffersState, changeCity(cityAmsterdam));
    expect(result.city).toEqual(cityAmsterdam);
  });

  it('should fill offers', () => {
    const offers = [{ ...baseOffer, id: '1' }, { ...baseOffer, id: '2' }];
    const result = offersReducer(initialOffersState, fillOffer(offers));
    expect(result.offers).toEqual(offers);
  });

  it('should change sorting', () => {
    const result = offersReducer(initialOffersState, changeSorting(SortingOptionVariants.TopRatedFirst));
    expect(result.sorting).toBe(SortingOptionVariants.TopRatedFirst);
  });

  it('should change offers loading status', () => {
    const result = offersReducer(initialOffersState, changeOffersLoadingStatus(true));
    expect(result.isOffersLoading).toBe(true);
  });

  it('should return current state for unknown action', () => {
    const state = { ...initialOffersState, city: cityAmsterdam };
    const result = offersReducer(state, { type: 'UNKNOWN_ACTION' } as never);
    expect(result).toEqual(state);
  });
});
