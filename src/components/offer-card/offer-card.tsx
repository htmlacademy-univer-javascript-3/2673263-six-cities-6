import {Link} from 'react-router-dom';
import type {Offer} from '../../types/offer';
import {AppRoute} from '../../const';

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

function OfferCard({ offer, onHover, variant = 'cities' }: OfferCardProps): JSX.Element {
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

  const cardImage = previewImage ?? images?.[0] ?? '';
  const ratingWidth = `${(rating / 5) * 100}%`;
  const cfg = VARIANT_CFG[variant];

  const linkTo = `${AppRoute.Offer}/${id}`;

  return (
    <article
      className={cfg.article}
      onMouseEnter={onHover ? () => onHover(id) : undefined}
      onMouseLeave={onHover ? () => onHover(null) : undefined}
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
}

export default OfferCard;
