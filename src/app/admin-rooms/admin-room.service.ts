import { Injectable } from '@angular/core';
import { Room } from '../room/Room';
@Injectable({
  providedIn: 'root'
})
export class AdminRoomService {
  private baseUrl = 'http://localhost:5144/api/admin/rooms';

  // Получить все номера
  async getAllRooms(): Promise<Room[]> {
    const res = await fetch(this.baseUrl, {
      credentials: 'include',
            headers: { 'Content-Type': 'application/json' },

    });
    
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  // Получить номер по ID
  async getRoomById(id: number): Promise<Room> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      credentials: 'include'
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  // Создать номер
  async createRoom(room: Room): Promise<Room> {
  const roomToSend = {
    ...room,
    number: room.number.toString(),  // если сервер требует строку
    facilities: room.facilities     // просто отправляем объект, сериализуется автоматически
  };

  console.log('Отправляю:', roomToSend);

  const res = await fetch(this.baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(roomToSend)  // JSON.stringify сериализует весь объект, включая facilities
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


  // Обновить номер
  async updateRoom(id: number, room: Room): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(room)
    });
    if (!res.ok) throw new Error(await res.text());
  }

  // Удалить номер
  async deleteRoom(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error(await res.text());
  }
}
