export interface Booking {
  id?: number;
  roomId: number;
  guestName: string;
  guestEmail: string;
  checkIn: string;  // Даты в ISO-формате: '2025-07-10'
  checkOut: string;
  createdAt?: string;
}
