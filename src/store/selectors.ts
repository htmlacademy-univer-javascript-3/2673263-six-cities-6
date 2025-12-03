import type {RootState} from './index';
import type {Offer} from '../types/offer';

export const selectCity = (state: RootState) => state.city;

export const selectOffersByCity = (state: RootState): Offer[] =>
  state.offers.filter((offer) => offer.city.name === state.city.name);
