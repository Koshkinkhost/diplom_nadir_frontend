import { Faciliti } from './Faciliti';
export interface Room {
  roomId: number;
  typeR: string;
  description?: string;
  pricePerNight: number; // цена за ночь
  mainImageUrl: string;
  falitires:Faciliti[]
}