import type {Offer} from '../../types/offer';
import NearbyOfferCard from '../nearby-offer-card/nearby-offer-card';

type NearbyOffersListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
};

function NearbyOffersList({ offers, onOfferHover }: NearbyOffersListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <NearbyOfferCard
          key={offer.id}
          offer={offer}
          onHover={onOfferHover}
        />
      ))}
    </div>
  );
}

export default NearbyOffersList;
