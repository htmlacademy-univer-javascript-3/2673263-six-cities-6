import OfferCard from '../offer-card/offer-card';
import type { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  className?: string;
  onOfferHover?: (offerId: string | null) => void;
};

function OffersList({ offers, className, onOfferHover }: OffersListProps): JSX.Element {
  return (
    <div className={className ?? 'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onHover={onOfferHover}
        />
      ))}
    </div>
  );
}

export default OffersList;
