import { combineReducers } from '@reduxjs/toolkit';
import { offersReducer } from './reducers/offers-reducer';
import { currentOfferReducer } from './reducers/current-offer-reducer';
import { nearbyOffersReducer } from './reducers/nearby-offers-reducer';
import { userReducer } from './reducers/user-reducer';
import { commentsReducer } from './reducers/comments-reducer';

export const reducer = combineReducers({
  offers: offersReducer,
  currentOffer: currentOfferReducer,
  nearbyOffers: nearbyOffersReducer,
  user: userReducer,
  comments: commentsReducer,
});

export type State = ReturnType<typeof reducer>;
