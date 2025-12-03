import type { City, Offer } from '../types/offer';
import { offers } from '../mocks/offers';
import { getCities } from '../mocks/cities';
import {Action, SortingOptionVariants} from '../const.ts';
import {changeCity, fillOffer, changeSorting} from './action';

export type State = {
  city: City;
  offers: Offer[];
  sorting: SortingOptionVariants;
};

const DEFAULT_CITY_NAME = 'Paris';

export const initialState: State = {
  city: getCities().find((city) => city.name === DEFAULT_CITY_NAME)!,
  offers,
  sorting: SortingOptionVariants.Popular,
};

type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffer>
  | ReturnType<typeof changeSorting>;

export const reducer = (
  state: State = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case Action.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };

    case Action.FILL_OFFER:
      return {
        ...state,
        offers: action.payload,
      };

    case Action.CHANGE_SORTING:
      return {
        ...state,
        sorting: action.payload,
      };

    default:
      return state;
  }
};
