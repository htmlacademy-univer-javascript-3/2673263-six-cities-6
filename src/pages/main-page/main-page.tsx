import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectCity, selectOffersByCity, selectSorting} from '../../store/selectors';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import {getCities} from '../../mocks/cities';
import {changeCity, changeSorting} from '../../store/action';
import {SortingOptionVariants} from '../../const';
import type {City} from '../../types/offer';
import { useState } from 'react';
import OffersList from '../../components/offers-list/offers-list.tsx';
import Map from '../../components/map/map.tsx';


function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const city = useAppSelector(selectCity);
  const offers = useAppSelector(selectOffersByCity);
  const sorting = useAppSelector(selectSorting);
  const offersCount = offers.length;

  const cities = getCities();

  const handleCityClick = (newCity: City) => {
    dispatch(changeCity(newCity));
    setActiveOfferId(null);
  };

  const handleSortingChange = (option: SortingOptionVariants) => {
    dispatch(changeSorting(option));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
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
      </main>
    </div>
  );
}

export default MainPage;
