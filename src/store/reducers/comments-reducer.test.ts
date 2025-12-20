import { describe, it, expect } from 'vitest';
import { commentsReducer, initialCommentsState } from './comments-reducer';
import { fillComments, changeCommentsLoadingStatus, changeCommentSendingStatus } from '../action';
import type { Review } from '../../types/review';

const makeReview = (id: string, date: string): Review => ({
  id,
  comment: 'Nice',
  date,
  rating: 4,
  user: { name: 'User', avatarUrl: 'img/avatar.jpg', isPro: false },
});

describe('commentsReducer', () => {
  it('should return initial state with empty action', () => {
    const result = commentsReducer(undefined, { type: 'UNKNOWN_ACTION' } as never);
    expect(result).toEqual(initialCommentsState);
  });

  it('should fill comments', () => {
    const comments = [makeReview('1', '2020-01-01'), makeReview('2', '2021-01-01')];
    const result = commentsReducer(initialCommentsState, fillComments(comments));
    expect(result.comments).toEqual(comments);
  });

  it('should change comments loading status', () => {
    const result = commentsReducer(initialCommentsState, changeCommentsLoadingStatus(true));
    expect(result.isCommentsLoading).toBe(true);
  });

  it('should change comment sending status', () => {
    const result = commentsReducer(initialCommentsState, changeCommentSendingStatus(true));
    expect(result.isCommentSending).toBe(true);
  });
});
