export interface Booking {
  id?:Number;
  RoomId: Number;
    GuestId?: Number;
  CheckIn: string;  // Даты в ISO-формате: '2025-07-10'
  CheckOut: string;
  CreatedAt?: string;
}
