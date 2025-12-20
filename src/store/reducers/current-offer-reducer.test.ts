import { describe, it, expect } from 'vitest';
import { currentOfferReducer, initialCurrentOfferState } from './current-offer-reducer';
import { loadCurrentOffer, changeCurrentOfferLoadingStatus } from '../action';
import type { City, Offer } from '../../types/offer';

const city: City = { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } };

const offer: Offer = {
  id: '10',
  title: 'Offer',
  description: 'Desc',
  type: 'room',
  price: 50,
  images: [],
  city,
  location: { latitude: 0, longitude: 0, zoom: 10 },
  goods: [],
  host: { isPro: true, name: 'Pro', avatarUrl: 'img/avatar.jpg' },
  isPremium: true,
  isFavorite: false,
  rating: 5,
  bedrooms: 1,
  maxAdults: 2,
};

describe('currentOfferReducer', () => {
  it('should return initial state with empty action', () => {
    const result = currentOfferReducer(undefined, { type: 'UNKNOWN_ACTION' } as never);
    expect(result).toEqual(initialCurrentOfferState);
  });

  it('should load current offer', () => {
    const result = currentOfferReducer(initialCurrentOfferState, loadCurrentOffer(offer));
    expect(result.currentOffer).toEqual(offer);
  });

  it('should set current offer to null', () => {
    const state = { ...initialCurrentOfferState, currentOffer: offer };
    const result = currentOfferReducer(state, loadCurrentOffer(null));
    expect(result.currentOffer).toBeNull();
  });

  it('should change current offer loading status', () => {
    const result = currentOfferReducer(initialCurrentOfferState, changeCurrentOfferLoadingStatus(true));
    expect(result.isCurrentOfferLoading).toBe(true);
  });
});
