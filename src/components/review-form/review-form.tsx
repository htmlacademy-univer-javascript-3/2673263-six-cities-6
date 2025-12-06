import {
  ChangeEvent,
  Fragment,
  FormEvent,
  useState
} from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../const.ts';
import { useAppDispatch } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';

const ratingMap = {
  '3': '5-stars',
  '2': '4-stars',
  '4': '3-stars',
  '1': '2-stars',
  '5': '1-stars',
};

type ReviewFormProps = {
  offerId: string;
  isSending: boolean;
};

function ReviewForm({ offerId, isSending }: ReviewFormProps) {
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const isFormValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating !== '';

  function handleTextareaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!isFormValid || isSending) {
      return;
    }

    dispatch(
      sendCommentAction({
        offerId,
        comment,
        rating: Number(rating),
      })
    )
      .unwrap()
      .then(() => {
        setComment('');
        setRating('');
      })
      .catch(() => {
      });
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, status]) => (
            <Fragment key={status}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={status}
                type="radio"
                checked={rating === score}
                onChange={handleInputChange}
                disabled={isSending}
              />

              <label
                htmlFor={status}
                className="reviews__rating-label form__rating-label"
                title={status}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleTextareaChange}
        disabled={isSending}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
