import type {State} from './reducer';
import {SortingOptionVariants} from '../const';

export const selectCity = (state: State) => state.city;
export const selectSorting = (state: State) => state.sorting;
export const selectOffers = (state: State) => state.offers;
export const selectIsOffersLoading = (state: State) => state.isOffersLoading;
export const selectCurrentOffer = (state: State) => state.currentOffer;
export const selectIsCurrentOfferLoading = (state: State) =>
  state.isCurrentOfferLoading;

export const selectNearbyOffers = (state: State) => state.nearbyOffers;
export const selectIsNearbyLoading = (state: State) => state.isNearbyLoading;

export const selectOffersByCity = (state: State) => {
  const {city, offers, sorting} = state;

  const filtered = offers.filter((offer) => offer.city.name === city.name);

  switch (sorting) {
    case SortingOptionVariants.PriceLowToHigh:
      return [...filtered].sort((a, b) => a.price - b.price);

    case SortingOptionVariants.PriceHighToLow:
      return [...filtered].sort((a, b) => b.price - a.price);

    case SortingOptionVariants.TopRatedFirst:
      return [...filtered].sort((a, b) => b.rating - a.rating);

    case SortingOptionVariants.Popular:
    default:
      return filtered;
  }
};
