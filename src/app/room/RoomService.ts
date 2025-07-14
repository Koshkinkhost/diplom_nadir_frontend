import { Injectable } from '@angular/core';
import { Room } from './Room';
@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private baseUrl = 'http://localhost:5144/api/rooms/';

  async getRooms(): Promise<Room[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Ошибка при загрузке комнат');
    return res.json();
  }

  async getRoom(id: number): Promise<Room> {
    const res = await fetch(`${this.baseUrl}${id}`);
    if (!res.ok) throw new Error('Ошибка при загрузке комнаты');
    return res.json();
  }

  async createRoom(room: Room): Promise<Room> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(room),
    });
    if (!res.ok) throw new Error('Ошибка при создании комнаты');
    return res.json();
  }

  async updateRoom(id: number, room: Room): Promise<void> {
    const res = await fetch(`${this.baseUrl}${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(room),
    });
    if (!res.ok) throw new Error('Ошибка при обновлении комнаты');
  }

  async deleteRoom(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Ошибка при удалении комнаты');
  }

  async getPopularRooms(count: number = 3): Promise<Room[]> {
    const res = await fetch(`${this.baseUrl}popular?count=${count}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Ошибка при загрузке популярных комнат');
    return res.json();
  }
}
