import {useState, useCallback} from 'react';
import {SortingOptionVariants} from '../../const';

type SortingOptionsProps = {
  activeOption: SortingOptionVariants;
  onChange: (option: SortingOptionVariants) => void;
};

const sortingOptions: SortingOptionVariants[] = [
  SortingOptionVariants.Popular,
  SortingOptionVariants.PriceLowToHigh,
  SortingOptionVariants.PriceHighToLow,
  SortingOptionVariants.TopRatedFirst,
];

function SortingOptions({activeOption, onChange}: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleOptionClick = useCallback((option: SortingOptionVariants) =>
    (evt: React.MouseEvent<HTMLLIElement>) => {
      evt.preventDefault();
      onChange(option);
      setIsOpen(false);
    }, [onChange]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {sortingOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${
              option === activeOption ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
