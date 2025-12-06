import type { Offer } from '../../types/offer';
import { Action } from '../../const.ts';
import {
  fillNearby,
  changeNearbyLoadingStatus,
} from '../action';

export type NearbyOffersState = {
  nearbyOffers: Offer[];
  isNearbyLoading: boolean;
};

export const initialNearbyOffersState: NearbyOffersState = {
  nearbyOffers: [],
  isNearbyLoading: false,
};

type NearbyOffersActions =
  | ReturnType<typeof fillNearby>
  | ReturnType<typeof changeNearbyLoadingStatus>;

export const nearbyOffersReducer = (
  state: NearbyOffersState = initialNearbyOffersState,
  action: NearbyOffersActions
): NearbyOffersState => {
  switch (action.type) {
    case Action.FILL_NEARBY:
      return { ...state, nearbyOffers: action.payload };

    case Action.CHANGE_NEARBY_LOADING_STATUS:
      return { ...state, isNearbyLoading: action.payload };

    default:
      return state;
  }
};

