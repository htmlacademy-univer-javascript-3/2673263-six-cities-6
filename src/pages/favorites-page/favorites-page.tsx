import Header from '../../components/header/header.tsx';
import { Link } from 'react-router-dom';
import OfferCard from '../../components/offer-card/offer-card';
import type { Offer } from '../../types/offer';

type FavoritesPageProps = {
  offers: Offer[];
};

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

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const favorites = offers.filter((o) => o.isFavorite);
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
