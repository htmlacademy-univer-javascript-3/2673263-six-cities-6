import {createAction} from '@reduxjs/toolkit';
import {Action} from '../const.ts';
import type {City, Offer} from '../types/offer';

export const changeCity = createAction(
  Action.CHANGE_CITY,
  (city: City) => ({
    payload: city,
  })
);

export const fillOffer = createAction(
  Action.FILL_OFFER,
  (offers: Offer[]) => ({
    payload: offers,
  })
);
