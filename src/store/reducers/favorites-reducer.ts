import type { Offer } from '../../types/offer';
import { Action } from '../../const.ts';
import { fillOffer } from '../action';

export type FavoritesState = {
  favorites: Offer[];
};

export const initialFavoritesState: FavoritesState = {
  favorites: [],
};

type FavoritesActions = ReturnType<typeof fillOffer>;

export const favoritesReducer = (
  state: FavoritesState = initialFavoritesState,
  action: FavoritesActions
): FavoritesState => {
  switch (action.type) {
    case Action.FILL_OFFER:
      return {
        ...state,
        favorites: action.payload.filter((offer) => offer.isFavorite),
      };

    default:
      return state;
  }
};

