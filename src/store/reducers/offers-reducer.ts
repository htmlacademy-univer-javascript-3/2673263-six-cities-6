import type { City, Offer } from '../../types/offer';
import { getCities } from '../../mocks/cities';
import { Action, SortingOptionVariants } from '../../const.ts';
import {
  changeCity,
  fillOffer,
  changeSorting,
  changeOffersLoadingStatus,
} from '../action';

export type OffersState = {
  city: City;
  offers: Offer[];
  sorting: SortingOptionVariants;
  isOffersLoading: boolean;
};

const DEFAULT_CITY_NAME = 'Paris';

export const initialOffersState: OffersState = {
  city: getCities().find((city) => city.name === DEFAULT_CITY_NAME)!,
  offers: [],
  sorting: SortingOptionVariants.Popular,
  isOffersLoading: false,
};

type OffersActions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffer>
  | ReturnType<typeof changeSorting>
  | ReturnType<typeof changeOffersLoadingStatus>;

export const offersReducer = (
  state: OffersState = initialOffersState,
  action: OffersActions
): OffersState => {
  switch (action.type) {
    case Action.CHANGE_CITY:
      return { ...state, city: action.payload };

    case Action.FILL_OFFER:
      return { ...state, offers: action.payload };

    case Action.CHANGE_SORTING:
      return { ...state, sorting: action.payload };

    case Action.CHANGE_OFFERS_LOADING_STATUS:
      return { ...state, isOffersLoading: action.payload };

    default:
      return state;
  }
};


