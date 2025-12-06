import {createSelector} from '@reduxjs/toolkit';
import type {State} from './reducer';
import {SortingOptionVariants} from '../const';

export const selectCity = (state: State) => state.offers.city;
export const selectSorting = (state: State) => state.offers.sorting;
export const selectOffers = (state: State) => state.offers.offers;
export const selectIsOffersLoading = (state: State) => state.offers.isOffersLoading;
export const selectCurrentOffer = (state: State) => state.currentOffer.currentOffer;
export const selectIsCurrentOfferLoading = (state: State) =>
  state.currentOffer.isCurrentOfferLoading;

export const selectNearbyOffers = (state: State) => state.nearbyOffers.nearbyOffers;
export const selectIsNearbyLoading = (state: State) => state.nearbyOffers.isNearbyLoading;

export const selectAuthorizationStatus = (state: State) => state.user.authorizationStatus;
export const selectUserEmail = (state: State) => state.user.userEmail;
export const selectUserAvatarUrl = (state: State) => state.user.userAvatarUrl;

export const selectComments = (state: State) => state.comments.comments;
export const selectIsCommentsLoading = (state: State) => state.comments.isCommentsLoading;
export const selectIsCommentSending = (state: State) => state.comments.isCommentSending;

const selectOffersByCityName = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const selectOffersByCity = createSelector(
  [selectOffersByCityName, selectSorting],
  (filteredOffers, sorting) => {
    switch (sorting) {
      case SortingOptionVariants.PriceLowToHigh:
        return [...filteredOffers].sort((a, b) => a.price - b.price);

      case SortingOptionVariants.PriceHighToLow:
        return [...filteredOffers].sort((a, b) => b.price - a.price);

      case SortingOptionVariants.TopRatedFirst:
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);

      case SortingOptionVariants.Popular:
      default:
        return filteredOffers;
    }
  }
);

export const selectFavoritesCount = createSelector(
  [selectOffers],
  (offers) => offers.filter((offer) => offer.isFavorite).length
);
