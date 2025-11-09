import type {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type NearbyOfferCardProps = {
  offer: Offer;
  onHover?: (offerId: string | null) => void;
};

function NearbyOfferCard({ offer, onHover }: NearbyOfferCardProps): JSX.Element {
  return (
    <OfferCard
      offer={offer}
      onHover={onHover}
      variant="near-places"
    />
  );
}

export default NearbyOfferCard;
