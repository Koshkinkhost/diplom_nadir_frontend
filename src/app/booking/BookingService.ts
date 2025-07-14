import { Injectable } from '@angular/core';
import { Booking } from './Booking';
import { Service } from './Service';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:5144/api/booking/'; // слеш в конце!

  // Получить все бронирования
  async getAllBookings(): Promise<Booking[]> {
    const res = await fetch(this.baseUrl, { credentials: 'include' });
    console.log(res.json())
    if (!res.ok) throw new Error('Ошибка при загрузке списка бронирований');
    return res.json();
  }

  // Получить бронирование по ID
  async getBooking(id: number): Promise<any> {
    const res = await fetch(`${this.baseUrl}user/${id}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Ошибка при получении бронирования');
    return res.json();
  }
async getAvailableServices(): Promise<Service[]> {
  console.log("ВЫЗЫВАЮ")
  const res = await fetch('http://localhost:5144/api/booking/services', {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Не удалось загрузить список услуг');
  return res.json();
}
  // Создать новое бронирование
  async createBooking(booking: Booking): Promise<Booking> {
  const res = await fetch("http://localhost:5144/api/booking/", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(booking)
  });

  const data = await res.json();

  if (!res.ok) {
    // Предполагается, что сервер возвращает ошибку в формате: { message: "..." }
    throw new Error(data.message || 'Ошибка при создании бронирования');
  }

  return data;
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
