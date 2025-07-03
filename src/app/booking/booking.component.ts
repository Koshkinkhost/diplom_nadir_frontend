import { Component } from '@angular/core';
import { RoomsService } from '../room/RoomService';
import { FormsModule } from '@angular/forms'; 
  import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Room } from '../room/Room';
import { CommonModule } from '@angular/common';
import { BookingService } from './BookingService';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive],
templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
rooms: Room[] = [];
  roomId: number = 0;
  checkIn: string = '';
  checkOut: string = '';
  guestName: string = '';
  guestEmail: string = '';
pricePerNight:number=0;
  successMessage = '';
  errorMessage = '';

constructor(
  private roomService: RoomsService,
  private bookingService: BookingService
) {}
  async ngOnInit() {
    this.rooms = await this.roomService.getRooms();
  }

  async bookRoom() {
    try {
      if (new Date(this.checkOut) <= new Date(this.checkIn)) {
        this.errorMessage = 'Дата выезда должна быть позже даты заезда';
        return;
      }

      // Здесь отправь на свой API бронирование
      const response = await fetch('http://localhost:5144/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          guestName: this.guestName,
          guestEmail: this.guestEmail,
          roomId: this.roomId,
          checkIn: this.checkIn,
          checkOut: this.checkOut
        })
      });

      if (!response.ok) throw new Error('Ошибка бронирования');
      this.successMessage = 'Бронирование успешно оформлено!';
      this.errorMessage = '';
    } catch (err) {
      this.errorMessage = 'Не удалось забронировать номер';
      this.successMessage = '';
    }
  }
}
