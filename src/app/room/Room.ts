import { Faciliti } from './Faciliti';
import { Facility } from '../admin-rooms/Facility';
export interface Room {
id: number;                        // RoomDTO.Id
  number: number;                   // 👈 string, не Number!
  type: string;                     // RoomDTO.Type
  pricePerNight: number;           // RoomDTO.PricePerNight
  capacity: number;                // RoomDTO.Capacity
  description?: string;            // RoomDTO.Description
  mainImageUrl: string;            // RoomDTO.MainImageUrl
  galleryJson?: string;            // RoomDTO.GalleryJson
  status?: string; 
  falitires?: Facility[] // ✅ пустой массив

}