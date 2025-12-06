import Header from '../../components/header/header.tsx';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectCity,
  selectOffersByCity,
  selectSorting,
  selectIsOffersLoading
} from '../../store/selectors';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import { getCities } from '../../mocks/cities';
import { changeCity, changeSorting } from '../../store/action';
import { SortingOptionVariants } from '../../const';
import type { City } from '../../types/offer';
import OffersList from '../../components/offers-list/offers-list.tsx';
import Map from '../../components/map/map.tsx';
import Spinner from '../../components/spinner/spinner.tsx';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const city = useAppSelector(selectCity);
  const offers = useAppSelector(selectOffersByCity);
  const sorting = useAppSelector(selectSorting);
  const isOffersLoading = useAppSelector(selectIsOffersLoading);

  const offersCount = offers.length;
  const hasOffers = offersCount > 0;
  const isEmpty = !isOffersLoading && !hasOffers;

  const cities = getCities();

  const handleCityClick = (newCity: City) => {
    dispatch(changeCity(newCity));
    setActiveOfferId(null);
  };

  const handleSortingChange = (option: SortingOptionVariants) => {
    dispatch(changeSorting(option));
  };

  let content: JSX.Element;

  if (isOffersLoading) {
    content = (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <Spinner />
          </section>
          <div className="cities__right-section" />
        </div>
      </div>
    );
  } else if (isEmpty) {
    content = (
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in{' '}
                {city.name}
              </p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offersCount} places to stay in {city.name}
            </b>
            <SortingOptions
              activeOption={sorting}
              onChange={handleSortingChange}
            />

            <OffersList offers={offers} onOfferHover={setActiveOfferId} />
          </section>

          <div className="cities__right-section">
            <Map
              key={city.name}
              city={city}
              offers={offers}
              activeOfferId={activeOfferId}
              className="cities__map map"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header isMainPage />

      <main
        className={`page__main page__main--index${
          isEmpty ? ' page__main--index-empty' : ''
        }`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={cities}
              activeCity={city}
              onCityClick={handleCityClick}
            />
          </section>
        </div>

        {content}
      </main>
    </div>
  );
}

export default MainPage;
