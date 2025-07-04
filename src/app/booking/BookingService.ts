import { Injectable } from '@angular/core';
import { Booking } from './Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:5144/api/bookings/'; // слеш в конце!

  // Получить все бронирования
  async getAllBookings(): Promise<Booking[]> {
    const res = await fetch(this.baseUrl, { credentials: 'include' });
    if (!res.ok) throw new Error('Ошибка при загрузке списка бронирований');
    return res.json();
  }

  // Получить бронирование по ID
  async getBooking(id: number): Promise<Booking> {
    const res = await fetch(`${this.baseUrl}${id}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Ошибка при получении бронирования');
    return res.json();
  }

  // Создать новое бронирование
  async createBooking(booking: Booking): Promise<Booking> {
    console.log(booking);
    const res = await fetch("http://localhost:5144/api/booking/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(booking)
    });
    if (!res.ok) throw new Error('Ошибка при создании бронирования');
    return res.json();
  }

  // Обновить бронирование
  async updateBooking(id: number, booking: Partial<Booking>): Promise<void> {
    const res = await fetch(`${this.baseUrl}${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(booking)
    });
    if (!res.ok) throw new Error('Ошибка при обновлении бронирования');
  }

  // Удалить бронирование
  async deleteBooking(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Ошибка при удалении бронирования');
  }
}
