import { Component,OnInit } from '@angular/core';
import { BookingService } from '../booking/BookingService';
import { RoomsService } from '../room/RoomService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Room } from '../room/Room';
import { AdminRoomService } from './admin-room.service';
import { Booking } from '../booking/Booking';
import { Faciliti } from '../room/Faciliti';
@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-rooms.component.html',
  styleUrl: './admin-rooms.component.css'
})
export class AdminRoomsComponent {
  bookings:Booking[]=[];
rooms: Room[] = [];
  error = '';
  success = '';
  editingRoom: Room | null = null;
availablefalitires: string[] = ['Wi-Fi', 'Джакузи', 'Мини-бар'];

newRoom: Room = {
  id: 0,
  number: 0,
  type: 'Стандарт',
  description: '',
  pricePerNight: 0,
  mainImageUrl: '',
  status: 'Available',
  capacity: 1,
  falitires: []
};


  constructor(private roomService: AdminRoomService) {}

  async ngOnInit() {
    await this.loadRooms();
  }
 toggleFacility(facilityName: string, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;

  if (checked) {
    // Добавляем в массив, если ещё нет
    if (!this.newRoom.falitires!.some(f => f.name === facilityName)) {
      this.newRoom.falitires!.push({ name: facilityName });
    }
  } else {
    // Убираем из массива
    this.newRoom.falitires = this.newRoom.falitires!.filter(f => f.name !== facilityName);
  }
}
isFacilityChecked(facilityName: string): boolean {
  return this.newRoom.falitires!.some(f => f.name === facilityName);
}


  async loadRooms() {
    try {
      this.rooms = await this.roomService.getAllRooms();
    } catch (e: any) {
      this.error = e.message;
    }
  }

  edit(room: Room) {
    this.editingRoom = { ...room };
  }

  cancelEdit() {
    this.editingRoom = null;
  }

  async saveEdit() {
    if (!this.editingRoom) return;
    try {
      await this.roomService.updateRoom(this.editingRoom.id,this.editingRoom);
      this.success = 'Комната обновлена';
      await this.loadRooms();
      this.editingRoom = null;
    } catch (e: any) {
      this.error = e.message;
    }
  }

  async remove(id: number) {
    try {
      await this.roomService.deleteRoom(id);
      this.success = 'Комната удалена';
      await this.loadRooms();
    } catch (e: any) {
      this.error = e.message;
    }
  }

  async create() {
  this.error = '';
  this.success = '';

  try {
    await this.roomService.createRoom(this.newRoom);
    this.success = 'Комната добавлена успешно';

    this.newRoom = {
      id: 0,
      number: 0,
      type: 'Стандарт',
      description: '',
      pricePerNight: 0,
      mainImageUrl: '',
      status: 'Available',
      capacity: 1,
      
    };

    await this.loadRooms();
  } catch (e: any) {
    this.error = e.message || 'Ошибка при добавлении комнаты';
  }
}

}
