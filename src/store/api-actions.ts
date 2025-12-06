import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';
import type { Review } from '../types/review';
import { APIRoute, AuthorizationStatus } from '../const';
import {
  changeOffersLoadingStatus,
  fillOffer,
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
import { saveToken, dropToken } from '../services/token';
import type { State } from './reducer';

type ThunkExtra = {
  extra: AxiosInstance;
};

type AuthInfo = {
  token: string;
  email: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

type LoginData = {
  email: string;
  password: string;
};

type CommentPostData = {
  offerId: string;
  comment: string;
  rating: number;
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

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkExtra>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<AuthInfo>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
      dispatch(setUserAvatar(data.avatarUrl));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserEmail(null));
      dispatch(setUserAvatar(null));
    }
  }
);

export const loginAction = createAsyncThunk<void, LoginData, ThunkExtra>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<AuthInfo>(APIRoute.Login, {
      email,
      password,
    });

    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserEmail(data.email));
    dispatch(setUserAvatar(data.avatarUrl));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkExtra>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
    } finally {
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserEmail(null));
      dispatch(setUserAvatar(null));
    }
  }
);

export const fetchComments = createAsyncThunk<void, string, ThunkExtra>(
  'data/fetchComments',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(changeCommentsLoadingStatus(true));

    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(fillComments(data));
    } catch {
      dispatch(fillComments([]));
    } finally {
      dispatch(changeCommentsLoadingStatus(false));
    }
  }
);

export const sendCommentAction = createAsyncThunk<
  void,
  CommentPostData,
  { extra: AxiosInstance; state: State }
>(
  'data/sendComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api, getState }) => {
    dispatch(changeCommentSendingStatus(true));

    try {
      const { data } = await api.post<Review[] | Review>(
        `${APIRoute.Comments}/${offerId}`,
        { comment, rating }
      );

      const state = getState();
      const prevComments = state.comments;

      const nextComments = Array.isArray(data)
        ? data
        : [...prevComments, data];

      dispatch(fillComments(nextComments));
    } finally {
      dispatch(changeCommentSendingStatus(false));
    }
  }
);


