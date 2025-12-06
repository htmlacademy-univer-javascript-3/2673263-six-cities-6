import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';
import { APIRoute } from '../const';
import {
  changeOffersLoadingStatus,
  fillOffer,
  loadCurrentOffer,
  changeCurrentOfferLoadingStatus,
  fillNearby,
  changeNearbyLoadingStatus,
} from './action';

type ThunkExtra = {
  extra: AxiosInstance;
};

export const fetchOffers = createAsyncThunk<void, undefined, ThunkExtra>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(changeOffersLoadingStatus(true));

    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(fillOffer(data));
    } catch (error) {
      // TODO: обработка ошибки
    } finally {
      dispatch(changeOffersLoadingStatus(false));
    }
  }
);

export const fetchOffer = createAsyncThunk<void, string, ThunkExtra>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(changeCurrentOfferLoadingStatus(true));

    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(loadCurrentOffer(data));
    } catch (error) {
      dispatch(loadCurrentOffer(null));
    } finally {
      dispatch(changeCurrentOfferLoadingStatus(false));
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, string, ThunkExtra>(
  'data/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(changeNearbyLoadingStatus(true));

    try {
      const { data } = await api.get<Offer[]>(
        `${APIRoute.Offers}/${offerId}/nearby`
      );
      dispatch(fillNearby(data));
    } catch (_error) {
      dispatch(fillNearby([]));
    } finally {
      dispatch(changeNearbyLoadingStatus(false));
    }
  }
);
