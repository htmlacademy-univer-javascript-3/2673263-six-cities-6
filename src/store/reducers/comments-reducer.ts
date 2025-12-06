import type { Review } from '../../types/review';
import { Action } from '../../const.ts';
import {
  fillComments,
  changeCommentsLoadingStatus,
  changeCommentSendingStatus,
} from '../action';

export type CommentsState = {
  comments: Review[];
  isCommentsLoading: boolean;
  isCommentSending: boolean;
};

export const initialCommentsState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  isCommentSending: false,
};

type CommentsActions =
  | ReturnType<typeof fillComments>
  | ReturnType<typeof changeCommentsLoadingStatus>
  | ReturnType<typeof changeCommentSendingStatus>;

export const commentsReducer = (
  state: CommentsState = initialCommentsState,
  action: CommentsActions
): CommentsState => {
  switch (action.type) {
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

