import { Action, AuthorizationStatus } from '../../const.ts';
import {
  requireAuthorization,
  setUserEmail,
  setUserAvatar,
} from '../action';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
  userAvatarUrl: string | null;
};

export const initialUserState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
  userAvatarUrl: null,
};

type UserActions =
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof setUserEmail>
  | ReturnType<typeof setUserAvatar>;

export const userReducer = (
  state: UserState = initialUserState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case Action.REQUIRE_AUTHORIZATION:
      return { ...state, authorizationStatus: action.payload };

    case Action.SET_USER_EMAIL:
      return { ...state, userEmail: action.payload };

    case Action.SET_USER_AVATAR:
      return { ...state, userAvatarUrl: action.payload };

    default:
      return state;
  }
};

