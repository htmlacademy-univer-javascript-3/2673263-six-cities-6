import {Link, useNavigate} from 'react-router-dom';
import {memo, useMemo, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import type {Offer} from '../../types/offer';
import {AppRoute, AuthorizationStatus} from '../../const';
import {toggleFavoriteAction} from '../../store/api-actions';
import {selectAuthorizationStatus} from '../../store/selectors';

type OfferCardProps = {
  offer: Offer;
  onHover?: (offerId: string | null) => void;
  variant?: 'cities' | 'favorites' | 'near-places';
};

const VARIANT_CFG = {
  cities: {
    article: 'cities__card place-card',
    imageWrap: 'cities__image-wrapper place-card__image-wrapper',
    infoWrap: 'place-card__info',
    size: { width: 260, height: 200 },
  },
  favorites: {
    article: 'favorites__card place-card',
    imageWrap: 'favorites__image-wrapper place-card__image-wrapper',
    infoWrap: 'favorites__card-info place-card__info',
    size: { width: 150, height: 110 },
  },
  'near-places': {
    article: 'near-places__card place-card',
    imageWrap: 'near-places__image-wrapper place-card__image-wrapper',
    infoWrap: 'place-card__info',
    size: { width: 260, height: 200 },
  },
} as const;

const OfferCard = memo(({ offer, onHover, variant = 'cities' }: OfferCardProps): JSX.Element => {
  const {
    id,
    isPremium,
    images,
    previewImage,
    price,
    isFavorite,
    rating,
    title,
    type,
  } = offer;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const cardImage = useMemo(() => previewImage ?? images?.[0] ?? '', [previewImage, images]);
  const ratingWidth = useMemo(() => `${(rating / 5) * 100}%`, [rating]);
  const cfg = VARIANT_CFG[variant];

  const linkTo = useMemo(() => `${AppRoute.Offer}/${id}`, [id]);

  const handleMouseEnter = useCallback(() => {
    onHover?.(id);
  }, [onHover, id]);

  const handleMouseLeave = useCallback(() => {
    onHover?.(null);
  }, [onHover]);

  const handleBookmarkClick = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(toggleFavoriteAction({ offerId: id, isFavorite: !isFavorite }));
  }, [authorizationStatus, navigate, dispatch, id, isFavorite]);

  return (
    <article
      className={cfg.article}
      onMouseEnter={onHover ? handleMouseEnter : undefined}
      onMouseLeave={onHover ? handleMouseLeave : undefined}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={cfg.imageWrap}>
        <Link to={linkTo}>
          <img
            className="place-card__image"
            src={cardImage}
            width={cfg.size.width}
            height={cfg.size.height}
            alt={title}
          />
        </Link>
      </div>

      <div className={cfg.infoWrap}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={linkTo}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
});

OfferCard.displayName = 'OfferCard';

export default OfferCard;
