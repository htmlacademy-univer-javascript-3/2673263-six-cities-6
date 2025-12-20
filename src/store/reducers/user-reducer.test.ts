import { describe, it, expect } from 'vitest';
import { userReducer, initialUserState } from './user-reducer';
import { requireAuthorization, setUserEmail, setUserAvatar } from '../action';
import { AuthorizationStatus } from '../../const';

describe('userReducer', () => {
  it('should return initial state with empty action', () => {
    const result = userReducer(undefined, { type: 'UNKNOWN_ACTION' } as never);
    expect(result).toEqual(initialUserState);
  });

  it('should set authorization status', () => {
    const result = userReducer(initialUserState, requireAuthorization(AuthorizationStatus.Auth));
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set user email', () => {
    const result = userReducer(initialUserState, setUserEmail('test@test.ru'));
    expect(result.userEmail).toBe('test@test.ru');
  });

  it('should set user avatar url', () => {
    const result = userReducer(initialUserState, setUserAvatar('img/avatar.jpg'));
    expect(result.userAvatarUrl).toBe('img/avatar.jpg');
  });
});
