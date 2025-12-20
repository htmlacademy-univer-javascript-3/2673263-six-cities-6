import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';
import type { Review } from '../types/review';
import type { State } from './reducer';
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
import {
  fetchOffers,
  fetchOffer,
  fetchNearbyOffers,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchComments,
  sendCommentAction,
  toggleFavoriteAction,
  fetchFavoritesAction,
} from './api-actions';

vi.mock('../services/token', () => ({
  saveToken: vi.fn(),
  dropToken: vi.fn(),
}));

type MockApi = Pick<AxiosInstance, 'get' | 'post' | 'delete'>;

const createMockApi = (): MockApi =>
  ({
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  }) as unknown as MockApi;

type PlainAction = { type: string; payload?: unknown };

const extractPlainActions = (dispatch: { mock: { calls: unknown[][] } }): PlainAction[] =>
  dispatch.mock.calls
    .map((call): unknown => call[0])
    .filter((arg): arg is PlainAction => {
      if (typeof arg !== 'object' || arg === null) {
        return false;
      }
      return 'type' in arg && typeof (arg as { type: unknown }).type === 'string';
    });

const filterByTypes = (actions: { type: string }[], types: string[]) => {
  const allowed = new Set<string>(types);
  return actions.filter((action) => allowed.has(action.type));
};

const makeOffer = (id: string, isFavorite = false): Offer =>
  ({ id, isFavorite } as Offer);

describe('Async actions (thunks)', () => {
  let api: MockApi;
  let dispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    api = createMockApi();
    dispatch = vi.fn();
  });

  it('fetchOffers: should dispatch loading on/off and fillOffer on success', async () => {
    const offers = [makeOffer('1'), makeOffer('2')];
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ data: offers });

    const getState = vi.fn(() => ({} as State));

    await fetchOffers()(dispatch, getState, api as unknown as AxiosInstance);

    expect(api.get).toHaveBeenCalledWith(APIRoute.Offers);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeOffersLoadingStatus.type,
      fillOffer.type,
    ]);

    expect(actions).toEqual([
      changeOffersLoadingStatus(true),
      fillOffer(offers),
      changeOffersLoadingStatus(false),
    ]);
  });

  it('fetchOffers: should dispatch loading on/off and not fillOffer on error', async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network'));
    const getState = vi.fn(() => ({} as State));

    await fetchOffers()(dispatch, getState, api as unknown as AxiosInstance);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeOffersLoadingStatus.type,
      fillOffer.type,
    ]);

    expect(actions).toEqual([
      changeOffersLoadingStatus(true),
      changeOffersLoadingStatus(false),
    ]);
  });

  it('fetchOffer: should loadCurrentOffer on success', async () => {
    const offer = makeOffer('10');
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ data: offer });

    const getState = vi.fn(() => ({} as State));

    await fetchOffer('10')(dispatch, getState, api as unknown as AxiosInstance);

    expect(api.get).toHaveBeenCalledWith(`${APIRoute.Offers}/10`);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeCurrentOfferLoadingStatus.type,
      loadCurrentOffer.type,
    ]);

    expect(actions).toEqual([
      changeCurrentOfferLoadingStatus(true),
      loadCurrentOffer(offer),
      changeCurrentOfferLoadingStatus(false),
    ]);
  });

  it('fetchOffer: should loadCurrentOffer(null) on error', async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('404'));
    const getState = vi.fn(() => ({} as State));

    await fetchOffer('10')(dispatch, getState, api as unknown as AxiosInstance);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeCurrentOfferLoadingStatus.type,
      loadCurrentOffer.type,
    ]);

    expect(actions).toEqual([
      changeCurrentOfferLoadingStatus(true),
      loadCurrentOffer(null),
      changeCurrentOfferLoadingStatus(false),
    ]);
  });

  it('fetchNearbyOffers: should fillNearby on success', async () => {
    const nearby = [makeOffer('1'), makeOffer('2')];
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ data: nearby });

    const getState = vi.fn(() => ({} as State));

    await fetchNearbyOffers('55')(dispatch, getState, api as unknown as AxiosInstance);

    expect(api.get).toHaveBeenCalledWith(`${APIRoute.Offers}/55/nearby`);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeNearbyLoadingStatus.type,
      fillNearby.type,
    ]);

    expect(actions).toEqual([
      changeNearbyLoadingStatus(true),
      fillNearby(nearby),
      changeNearbyLoadingStatus(false),
    ]);
  });

  it('fetchNearbyOffers: should fillNearby([]) on error', async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network'));

    const getState = vi.fn(() => ({} as State));

    await fetchNearbyOffers('55')(dispatch, getState, api as unknown as AxiosInstance);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeNearbyLoadingStatus.type,
      fillNearby.type,
    ]);

    expect(actions).toEqual([
      changeNearbyLoadingStatus(true),
      fillNearby([]),
      changeNearbyLoadingStatus(false),
    ]);
  });

  it('checkAuthAction: should set Auth and user data on success', async () => {
    const authInfo = { email: 'a@a.ru', avatarUrl: 'img/avatar.jpg' };
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ data: authInfo });

    const getState = vi.fn(() => ({} as State));

    await checkAuthAction()(dispatch, getState, api as unknown as AxiosInstance);

    expect(api.get).toHaveBeenCalledWith(APIRoute.Login);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      requireAuthorization.type,
      setUserEmail.type,
      setUserAvatar.type,
    ]);

    expect(actions).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      setUserEmail('a@a.ru'),
      setUserAvatar('img/avatar.jpg'),
    ]);
  });

  it('checkAuthAction: should set NoAuth and clear user data on error', async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('401'));

    const getState = vi.fn(() => ({} as State));

    await checkAuthAction()(dispatch, getState, api as unknown as AxiosInstance);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      requireAuthorization.type,
      setUserEmail.type,
      setUserAvatar.type,
    ]);

    expect(actions).toEqual([
      requireAuthorization(AuthorizationStatus.NoAuth),
      setUserEmail(null),
      setUserAvatar(null),
    ]);
  });

  it('loginAction: should call POST /login and set Auth + user data (token is mocked)', async () => {
    const authResponse = {
      token: 'token-123',
      email: 'test@test.ru',
      name: 'Name',
      avatarUrl: 'img/a.jpg',
      isPro: false,
    };
    (api.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ data: authResponse });

    const getState = vi.fn(() => ({} as State));

    await loginAction({ email: 'test@test.ru', password: 'pass1' })(
      dispatch,
      getState,
      api as unknown as AxiosInstance
    );

    expect(api.post).toHaveBeenCalledWith(APIRoute.Login, {
      email: 'test@test.ru',
      password: 'pass1',
    });

    const actions = filterByTypes(extractPlainActions(dispatch), [
      requireAuthorization.type,
      setUserEmail.type,
      setUserAvatar.type,
    ]);

    expect(actions).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      setUserEmail('test@test.ru'),
      setUserAvatar('img/a.jpg'),
    ]);
  });

  it('logoutAction: should clear auth even if request fails (token drop is mocked)', async () => {
    (api.delete as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network'));

    const getState = vi.fn(() => ({} as State));

    await logoutAction()(dispatch, getState, api as unknown as AxiosInstance);

    expect(api.delete).toHaveBeenCalledWith(APIRoute.Logout);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      requireAuthorization.type,
      setUserEmail.type,
      setUserAvatar.type,
    ]);

    expect(actions).toEqual([
      requireAuthorization(AuthorizationStatus.NoAuth),
      setUserEmail(null),
      setUserAvatar(null),
    ]);
  });

  it('fetchComments: should fillComments on success and switch loading', async () => {
    const comments = [{ id: 'c1' } as Review];
    (api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ data: comments });

    const getState = vi.fn(() => ({} as State));

    await fetchComments('77')(dispatch, getState, api as unknown as AxiosInstance);

    expect(api.get).toHaveBeenCalledWith(`${APIRoute.Comments}/77`);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeCommentsLoadingStatus.type,
      fillComments.type,
    ]);

    expect(actions).toEqual([
      changeCommentsLoadingStatus(true),
      fillComments(comments),
      changeCommentsLoadingStatus(false),
    ]);
  });

  it('fetchComments: should fillComments([]) on error and switch loading', async () => {
    (api.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network'));

    const getState = vi.fn(() => ({} as State));

    await fetchComments('77')(dispatch, getState, api as unknown as AxiosInstance);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeCommentsLoadingStatus.type,
      fillComments.type,
    ]);

    expect(actions).toEqual([
      changeCommentsLoadingStatus(true),
      fillComments([]),
      changeCommentsLoadingStatus(false),
    ]);
  });

  it('sendCommentAction: should POST comment, dispatch thunk (fetchComments) and switch sending', async () => {
    (api.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    const getState = vi.fn(() => ({} as State));

    await sendCommentAction({ offerId: '12', comment: 'text', rating: 5 })(
      dispatch,
      getState,
      api as unknown as AxiosInstance
    );

    expect(api.post).toHaveBeenCalledWith(`${APIRoute.Comments}/12`, {
      comment: 'text',
      rating: 5,
    });

    const actions = filterByTypes(extractPlainActions(dispatch), [
      changeCommentSendingStatus.type,
    ]);

    expect(actions).toEqual([
      changeCommentSendingStatus(true),
      changeCommentSendingStatus(false),
    ]);

    const hasThunkDispatch = dispatch.mock.calls.some((call) => typeof call[0] === 'function');
    expect(hasThunkDispatch).toBe(true);
  });

  it('toggleFavoriteAction: should update offers and current offer when ids match', async () => {
    const updated = makeOffer('1', true);
    (api.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ data: updated });

    const state = {
      offers: { offers: [makeOffer('1', false), makeOffer('2', false)] },
      currentOffer: { currentOffer: makeOffer('1', false) },
    } as unknown as State;

    const getState = vi.fn(() => state);

    const resultAction = await toggleFavoriteAction({ offerId: '1', isFavorite: true })(
      dispatch,
      getState,
      api as unknown as AxiosInstance
    );

    expect(api.post).toHaveBeenCalledWith(`${APIRoute.Favorite}/1/1`);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      fillOffer.type,
      loadCurrentOffer.type,
    ]);

    expect(actions).toEqual([
      fillOffer([updated, makeOffer('2', false)]),
      loadCurrentOffer(updated),
    ]);

    expect(resultAction.type).toBe('data/toggleFavorite/fulfilled');
    expect((resultAction as { payload: Offer }).payload).toEqual(updated);
  });

  it('fetchFavoritesAction: should merge favorites to offers and dispatch fillOffer', async () => {
    const favorites = [makeOffer('1', true)];
    const allOffers = [makeOffer('1', false), makeOffer('2', false)];

    (api.get as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ data: favorites })
      .mockResolvedValueOnce({ data: allOffers });

    const getState = vi.fn(() => ({} as State));

    await fetchFavoritesAction()(dispatch, getState, api as unknown as AxiosInstance);

    expect(api.get).toHaveBeenNthCalledWith(1, APIRoute.Favorite);
    expect(api.get).toHaveBeenNthCalledWith(2, APIRoute.Offers);

    const actions = filterByTypes(extractPlainActions(dispatch), [
      fillOffer.type,
    ]);

    expect(actions).toEqual([
      fillOffer([makeOffer('1', true), makeOffer('2', false)]),
    ]);
  });
});
