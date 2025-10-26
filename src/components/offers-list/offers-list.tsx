import OfferCard from '../offer-card/offer-card';
import type { Offer } from '../../types/offer';
import {useState} from 'react';

type OffersListProps = {
  offers: Offer[];
  className?: string;
};

function OffersList({ offers, className }: OffersListProps): JSX.Element {
  const [_activeOfferId, setActiveOfferId] = useState<string | null>(null);
  return (
    <div className={className ?? 'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onHover={setActiveOfferId}
        />
      ))}
    </div>
  );
}

export default OffersList;
