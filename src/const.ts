export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const [MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH] = [50, 300];

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum Action {
  CHANGE_CITY = 'changeCity',
  FILL_OFFER = 'fillOffer',
  CHANGE_SORTING = 'changeSorting',
  CHANGE_OFFERS_LOADING_STATUS = 'changeOffersLoadingStatus',
  LOAD_CURRENT_OFFER = 'loadCurrentOffer',
  FILL_NEARBY = 'fillNearby',
  CHANGE_CURRENT_OFFER_LOADING_STATUS = 'changeCurrentOfferLoadingStatus',
  CHANGE_NEARBY_LOADING_STATUS = 'changeNearbyLoadingStatus',
  REQUIRE_AUTHORIZATION = 'requireAuthorization',
  SET_USER_EMAIL = 'setUserEmail',
  SET_USER_AVATAR = 'setUserAvatar',
  FILL_COMMENTS = 'fillComments',
  CHANGE_COMMENTS_LOADING_STATUS = 'changeCommentsLoadingStatus',
  CHANGE_COMMENT_SENDING_STATUS = 'changeCommentSendingStatus',
}

export enum SortingOptionVariants {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
