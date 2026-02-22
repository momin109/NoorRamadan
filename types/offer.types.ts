export interface Offer {
  title: string;
  features: string[];
  originalPrice: string;
  offerPrice: string;
  badge: string;
}

export interface OfferCardProps {
  offer: Offer;
  index: number;
}
