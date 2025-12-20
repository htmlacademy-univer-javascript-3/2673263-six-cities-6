import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReviewForm from './review-form';
import { MIN_COMMENT_LENGTH } from '../../const';

const dispatchMock = vi.fn();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => dispatchMock,
}));

const sendCommentActionMock = vi.fn((payload: unknown) => ({
  type: 'data/sendComment',
  payload,
  unwrap: () => Promise.resolve(),
}));

vi.mock('../../store/api-actions', () => ({
  sendCommentAction: (payload: unknown) => sendCommentActionMock(payload),
}));

describe('Component: ReviewForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock.mockImplementation((action: unknown) => action);
  });

  it('should render correctly', () => {
    render(<ReviewForm offerId="12" isSending={false} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Tell how was your stay/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should enable submit when form is valid', () => {
    render(<ReviewForm offerId="12" isSending={false} />);

    fireEvent.click(screen.getByDisplayValue('5'));

    fireEvent.change(screen.getByPlaceholderText(/Tell how was your stay/i), {
      target: { value: 'a'.repeat(MIN_COMMENT_LENGTH) },
    });

    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('should dispatch sendCommentAction on submit when valid and not sending', () => {
    render(<ReviewForm offerId="12" isSending={false} />);

    fireEvent.click(screen.getByDisplayValue('5'));
    fireEvent.change(screen.getByPlaceholderText(/Tell how was your stay/i), {
      target: { value: 'a'.repeat(MIN_COMMENT_LENGTH) },
    });

    const form = screen.getByRole('button', { name: 'Submit' }).closest('form') as HTMLFormElement;
    fireEvent.submit(form);

    expect(sendCommentActionMock).toHaveBeenCalledWith({
      offerId: '12',
      comment: 'a'.repeat(MIN_COMMENT_LENGTH),
      rating: 5,
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it('should disable inputs when isSending is true', () => {
    render(<ReviewForm offerId="12" isSending />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeDisabled();
  });
});
