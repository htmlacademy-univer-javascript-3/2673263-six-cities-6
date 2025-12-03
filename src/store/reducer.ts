import type { City, Offer } from '../types/offer';
import { offers } from '../mocks/offers';
import { getCities } from '../mocks/cities';
import {Action} from '../const.ts';
import {changeCity, fillOffer} from './action';

export type State = {
  city: City;
  offers: Offer[];
};

const DEFAULT_CITY_NAME = 'Paris';

export const initialState: State = {
  city: getCities().find((city) => city.name === DEFAULT_CITY_NAME)!,
  offers,
};

type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffer>;

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

    default:
      return state;
  }
};
