import { describe, it, expect } from 'vitest';
import { nearbyOffersReducer, initialNearbyOffersState } from './nearby-offers-reducer';
import { fillNearby, changeNearbyLoadingStatus } from '../action';
import type { City, Offer } from '../../types/offer';

const city: City = { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } };

const makeOffer = (id: string): Offer => ({
  id,
  title: 't',
  description: 'd',
  type: 'house',
  price: 100,
  images: [],
  city,
  location: { latitude: 0, longitude: 0, zoom: 10 },
  goods: [],
  host: { isPro: false, name: 'Host', avatarUrl: 'img/avatar.jpg' },
  isPremium: false,
  isFavorite: false,
  rating: 4,
  bedrooms: 1,
  maxAdults: 2,
});

describe('nearbyOffersReducer', () => {
  it('should return initial state with empty action', () => {
    const result = nearbyOffersReducer(undefined, { type: 'UNKNOWN_ACTION' } as never);
    expect(result).toEqual(initialNearbyOffersState);
  });

  it('should fill nearby offers', () => {
    const offers = [makeOffer('1'), makeOffer('2')];
    const result = nearbyOffersReducer(initialNearbyOffersState, fillNearby(offers));
    expect(result.nearbyOffers).toEqual(offers);
  });

  it('should change nearby loading status', () => {
    const result = nearbyOffersReducer(initialNearbyOffersState, changeNearbyLoadingStatus(true));
    expect(result.isNearbyLoading).toBe(true);
  });
});
