import type { Offer } from '../../types/offer';
import { Action } from '../../const.ts';
import {
  loadCurrentOffer,
  changeCurrentOfferLoadingStatus,
} from '../action';

export type CurrentOfferState = {
  currentOffer: Offer | null;
  isCurrentOfferLoading: boolean;
};

export const initialCurrentOfferState: CurrentOfferState = {
  currentOffer: null,
  isCurrentOfferLoading: false,
};

type CurrentOfferActions =
  | ReturnType<typeof loadCurrentOffer>
  | ReturnType<typeof changeCurrentOfferLoadingStatus>;

export const currentOfferReducer = (
  state: CurrentOfferState = initialCurrentOfferState,
  action: CurrentOfferActions
): CurrentOfferState => {
  switch (action.type) {
    case Action.LOAD_CURRENT_OFFER:
      return { ...state, currentOffer: action.payload };

    case Action.CHANGE_CURRENT_OFFER_LOADING_STATUS:
      return { ...state, isCurrentOfferLoading: action.payload };

    default:
      return state;
  }
};

