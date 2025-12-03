import React from 'react';
import type {City} from '../../types/offer';

type CitiesListProps = {
  cities: City[];
  activeCity: City;
  onCityClick: (city: City) => void;
};

function CitiesList({cities, activeCity, onCityClick}: CitiesListProps): JSX.Element {
  const handleClick = (city: City) =>
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      if (city.name === activeCity.name) {
        return;
      }

      onCityClick(city);
    };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city.name}>
          <a
            className={
              `locations__item-link tabs__item ${
                city.name === activeCity.name ? 'tabs__item--active' : ''
              }`
            }
            href="#"
            onClick={handleClick(city)}
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
