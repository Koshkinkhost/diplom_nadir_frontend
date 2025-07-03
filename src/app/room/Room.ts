export interface Room {
  id: number;
  type: string;
  description?: string;
  pricePerNight: number; // цена за ночь
  mainImageUrl: string;
}