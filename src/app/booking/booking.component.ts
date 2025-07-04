import { Component } from '@angular/core';
import { RoomsService } from '../room/RoomService';
import { FormsModule } from '@angular/forms'; 
  import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Room } from '../room/Room';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService } from './BookingService';
import { AuthService } from '../auth/AuthService';
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
  userId:Number=0;

constructor(
  private roomService: RoomsService,
  private bookingService: BookingService,
  private router:Router,
  private auth:AuthService
) {}
  async ngOnInit() {
    this.rooms = await this.roomService.getRooms();
    try {
      const user = await this.auth.getCurrentUser();
      this.userId = user.id;
      // ...
    } catch {
      this.router.navigate(['/auth']);
    }
  }

  async bookRoom() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.userId) {
      this.errorMessage = 'Пожалуйста, авторизуйтесь, чтобы забронировать номер.';
      this.router.navigate(['/auth']);
      return;
    }

    if (new Date(this.checkOut) <= new Date(this.checkIn)) {
      this.errorMessage = 'Дата выезда должна быть позже даты заезда';
      return;
    }

    try {
      const booking = {
        RoomId: this.roomId,
        GuestId: this.userId,
        CheckIn: this.checkIn,
        CheckOut: this.checkOut,
        CreatedAt: new Date().toISOString(),
      };

      await this.bookingService.createBooking(booking);

      this.successMessage = 'Бронирование успешно оформлено!';
      this.errorMessage = '';
    } catch (err: any) {
      this.errorMessage = err.message || 'Не удалось забронировать номер';
      this.successMessage = '';
    }
  }
}
