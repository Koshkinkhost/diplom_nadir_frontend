import { Room } from './Room';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // автоматическая регистрация
})
export class RoomsService {
  // В конце обязательно слеш, чтобы удобно было писать относительные пути
  private baseUrl = 'http://localhost:5144/api/rooms/';

  async getRooms(): Promise<Room[]> {
    const res = await fetch(this.baseUrl, { credentials: 'include' });
    if (!res.ok) throw new Error('Ошибка при загрузке комнат');
    return res.json();
  }

  async getRoom(id: number): Promise<Room> {
    const res = await fetch(`${this.baseUrl}${id}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Ошибка при загрузке комнаты');
    return res.json();
  }

  async createRoom(room: Partial<Room>): Promise<Room> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(room),
    });
    if (!res.ok) throw new Error('Ошибка при создании комнаты');
    return res.json();
  }

  async updateRoom(id: number, room: Partial<Room>): Promise<void> {
    const res = await fetch(`${this.baseUrl}${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(room),
    });
    if (!res.ok) throw new Error('Ошибка при обновлении комнаты');
  }

  async getPopularRooms(count = 3): Promise<Room[]> {
    const res = await fetch(`${this.baseUrl}popular?count=${count}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Ошибка при загрузке популярных комнат');
    return res.json();
  }

  async deleteRoom(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Ошибка при удалении комнаты');
  }
}

