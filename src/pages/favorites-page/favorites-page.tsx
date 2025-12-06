import Header from '../../components/header/header.tsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import OfferCard from '../../components/offer-card/offer-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-actions';
import type { Offer } from '../../types/offer';

function groupByCity(favorites: Offer[]) {
  const map = new Map<string, Offer[]>();
  favorites.forEach((o) => {
    const city = o.city.name;
    if (!map.has(city)) {
      map.set(city, [o]);
    } else {
      map.get(city)!.push(o);
    }
  });
  return map;
}

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.offers.offers.filter((o) => o.isFavorite));

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (favorites.length === 0) {
    return (
      <div className="page">
        <Header />

        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>

        <footer className="footer container">
          <Link className="footer__logo-link" to="/">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </Link>
        </footer>
      </div>
    );
  }

  const grouped = groupByCity(favorites);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Array.from(grouped.entries()).map(([city, cityOffers]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>

                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <OfferCard key={offer.id} offer={offer} variant="favorites" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
