import type { City, Offer } from '../types/offer';
import type { Review } from '../types/review';
import { getCities } from '../mocks/cities';
import { Action, AuthorizationStatus, SortingOptionVariants } from '../const.ts';
import {
  changeCity,
  fillOffer,
  changeSorting,
  changeOffersLoadingStatus,
  loadCurrentOffer,
  changeCurrentOfferLoadingStatus,
  fillNearby,
  changeNearbyLoadingStatus,
  requireAuthorization,
  setUserEmail,
  setUserAvatar,
  fillComments,
  changeCommentsLoadingStatus,
  changeCommentSendingStatus,
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
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
  userAvatarUrl: string | null;
  comments: Review[];
  isCommentsLoading: boolean;
  isCommentSending: boolean;
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
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
  userAvatarUrl: null,
  comments: [],
  isCommentsLoading: false,
  isCommentSending: false,
};

type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffer>
  | ReturnType<typeof changeSorting>
  | ReturnType<typeof changeOffersLoadingStatus>
  | ReturnType<typeof loadCurrentOffer>
  | ReturnType<typeof changeCurrentOfferLoadingStatus>
  | ReturnType<typeof fillNearby>
  | ReturnType<typeof changeNearbyLoadingStatus>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof setUserEmail>
  | ReturnType<typeof setUserAvatar>
  | ReturnType<typeof fillComments>
  | ReturnType<typeof changeCommentsLoadingStatus>
  | ReturnType<typeof changeCommentSendingStatus>;

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

    case Action.REQUIRE_AUTHORIZATION:
      return { ...state, authorizationStatus: action.payload };

    case Action.SET_USER_EMAIL:
      return { ...state, userEmail: action.payload };

    case Action.SET_USER_AVATAR:
      return { ...state, userAvatarUrl: action.payload };

    case Action.FILL_COMMENTS:
      return { ...state, comments: action.payload };

    case Action.CHANGE_COMMENTS_LOADING_STATUS:
      return { ...state, isCommentsLoading: action.payload };

    case Action.CHANGE_COMMENT_SENDING_STATUS:
      return { ...state, isCommentSending: action.payload };

    default:
      return state;
  }
};
