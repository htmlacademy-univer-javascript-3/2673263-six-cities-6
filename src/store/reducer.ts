import type { City, Offer } from '../types/offer';
import { getCities } from '../mocks/cities';
import { Action, SortingOptionVariants } from '../const.ts';
import {
  changeCity,
  fillOffer,
  changeSorting,
  changeOffersLoadingStatus,
  loadCurrentOffer,
  changeCurrentOfferLoadingStatus,
  fillNearby,
  changeNearbyLoadingStatus,
} from './action';

export type State = {
  city: City;
  offers: Offer[];
  sorting: SortingOptionVariants;
  isOffersLoading: boolean;
  currentOffer: Offer | null;
  isCurrentOfferLoading: boolean;
  nearbyOffers: Offer[];
  isNearbyLoading: boolean;
};

const DEFAULT_CITY_NAME = 'Paris';

export const initialState: State = {
  city: getCities().find((city) => city.name === DEFAULT_CITY_NAME)!,
  offers: [],
  sorting: SortingOptionVariants.Popular,
  isOffersLoading: false,
  currentOffer: null,
  isCurrentOfferLoading: false,
  nearbyOffers: [],
  isNearbyLoading: false,
};

type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffer>
  | ReturnType<typeof changeSorting>
  | ReturnType<typeof changeOffersLoadingStatus>
  | ReturnType<typeof loadCurrentOffer>
  | ReturnType<typeof changeCurrentOfferLoadingStatus>
  | ReturnType<typeof fillNearby>
  | ReturnType<typeof changeNearbyLoadingStatus>;

export const reducer = (
  state: State = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case Action.CHANGE_CITY:
      return { ...state, city: action.payload };

    case Action.FILL_OFFER:
      return { ...state, offers: action.payload };

    case Action.CHANGE_SORTING:
      return { ...state, sorting: action.payload };

    case Action.CHANGE_OFFERS_LOADING_STATUS:
      return { ...state, isOffersLoading: action.payload };

    case Action.LOAD_CURRENT_OFFER:
      return { ...state, currentOffer: action.payload };

    case Action.CHANGE_CURRENT_OFFER_LOADING_STATUS:
      return { ...state, isCurrentOfferLoading: action.payload };

    case Action.FILL_NEARBY:
      return { ...state, nearbyOffers: action.payload };

    case Action.CHANGE_NEARBY_LOADING_STATUS:
      return { ...state, isNearbyLoading: action.payload };

    default:
      return state;
  }
};
