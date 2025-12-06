import { createAction } from '@reduxjs/toolkit';
import { Action, AuthorizationStatus, SortingOptionVariants } from '../const.ts';
import type { City, Offer } from '../types/offer';

export const changeCity = createAction(
  Action.CHANGE_CITY,
  (city: City) => ({
    payload: city,
  })
);

export const fillOffer = createAction(
  Action.FILL_OFFER,
  (offers: Offer[]) => ({
    payload: offers,
  })
);

export const changeSorting = createAction(
  Action.CHANGE_SORTING,
  (sorting: SortingOptionVariants) => ({
    payload: sorting,
  })
);

export const changeOffersLoadingStatus = createAction(
  Action.CHANGE_OFFERS_LOADING_STATUS,
  (isLoading: boolean) => ({
    payload: isLoading,
  })
);

export const loadCurrentOffer = createAction(
  Action.LOAD_CURRENT_OFFER,
  (offer: Offer | null) => ({
    payload: offer,
  })
);

export const changeCurrentOfferLoadingStatus = createAction(
  Action.CHANGE_CURRENT_OFFER_LOADING_STATUS,
  (isLoading: boolean) => ({
    payload: isLoading,
  })
);

export const fillNearby = createAction(
  Action.FILL_NEARBY,
  (offers: Offer[]) => ({
    payload: offers,
  })
);

export const changeNearbyLoadingStatus = createAction(
  Action.CHANGE_NEARBY_LOADING_STATUS,
  (isLoading: boolean) => ({
    payload: isLoading,
  })
);

export const requireAuthorization = createAction(
  Action.REQUIRE_AUTHORIZATION,
  (status: AuthorizationStatus) => ({
    payload: status,
  })
);

export const setUserEmail = createAction(
  Action.SET_USER_EMAIL,
  (email: string | null) => ({
    payload: email,
  })
);

export const setUserAvatar = createAction(
  Action.SET_USER_AVATAR,
  (avatarUrl: string | null) => ({
    payload: avatarUrl,
  })
);
