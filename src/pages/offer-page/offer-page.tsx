import Header from '../../components/header/header.tsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';
import { reviews } from '../../mocks/reviews';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectCurrentOffer,
  selectIsCurrentOfferLoading,
  selectNearbyOffers,
} from '../../store/selectors';
import { fetchOffer, fetchNearbyOffers } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(selectCurrentOffer);
  const isCurrentOfferLoading = useAppSelector(selectIsCurrentOfferLoading);
  const nearbyOffers = useAppSelector(selectNearbyOffers);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearbyOffers(id));
    }
  }, [dispatch, id]);

  if (!id) {
    return <h1>Такого предложения нет</h1>;
  }

  if (isCurrentOfferLoading || !currentOffer) {
    return <Spinner />;
  }

  const ratingWidth = `${(currentOffer.rating / 5) * 100}%`;

  const nearbyForList = nearbyOffers.slice(0, 3);

  const offersForMap = [currentOffer, ...nearbyForList];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {(currentOffer.images ?? []).slice(0, 6).map((img) => (
                <div className="offer__image-wrapper" key={img}>
                  <img
                    className="offer__image"
                    src={img}
                    alt={currentOffer.title}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedroom
                  {currentOffer.bedrooms && currentOffer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">
                  &euro;{currentOffer.price}
                </b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {(currentOffer.goods ?? []).map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              {currentOffer.host && (
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div
                      className={`offer__avatar-wrapper ${
                        currentOffer.host.isPro
                          ? 'offer__avatar-wrapper--pro'
                          : ''
                      } user__avatar-wrapper`}
                    >
                      <img
                        className="offer__avatar user__avatar"
                        src={currentOffer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">
                      {currentOffer.host.name}
                    </span>
                    {currentOffer.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {currentOffer.description}
                    </p>
                  </div>
                </div>
              )}

              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>

          <Map
            city={currentOffer.city}
            offers={offersForMap}
            activeOfferId={activeOfferId ?? currentOffer.id}
            className="offer__map map"
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>

            <NearbyOffersList
              offers={nearbyForList}
              onOfferHover={setActiveOfferId}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
