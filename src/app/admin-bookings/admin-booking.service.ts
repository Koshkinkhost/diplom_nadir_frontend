import { Injectable } from '@angular/core';
import { Booking } from '../booking/Booking';
@Injectable({
  providedIn: 'root'
})
export class AdminBookingService {

  constructor() { }
  private baseUrl = 'http://localhost:5144/api/admin/bookings';


  // Получить все бронирования
  async getAllBookings(): Promise<Booking[]> {
    const res = await fetch(this.baseUrl, {
      credentials: 'include'
    });

    if (!res.ok) throw new Error('Ошибка получения бронирований');
    return res.json();
  }

  // Получить бронирование по ID
  async getBooking(id: number): Promise<Booking> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      credentials: 'include'
    });

    if (!res.ok) throw new Error('Ошибка получения бронирования');
    return res.json();
  }

  // Обновить бронирование
  async updateBooking(booking: Booking): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${booking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(booking)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Ошибка обновления бронирования');
    }
  }

  // Удалить бронирование
  async deleteBooking(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Ошибка удаления бронирования');
    }
  }
}
