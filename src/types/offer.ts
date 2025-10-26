export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Host = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  type: OfferType;
  price: number;
  images: string[];
  city: City;
  location: Location;
  goods: string[];
  host: Host;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
};
