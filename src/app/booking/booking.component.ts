import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoomsService } from '../room/RoomService';
import { FormsModule } from '@angular/forms'; 
  import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Room } from '../room/Room';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService } from './BookingService';
import { AuthService } from '../auth/AuthService';
import { Service } from './Service';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive],
templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  services:Service[]=[]
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
selectedServiceIds: number[] = [];

constructor(
  private roomService: RoomsService,
  private bookingService: BookingService,
  private router:Router,
  private auth:AuthService,
    private route: ActivatedRoute,

) {}
  async ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
    const id = +params['roomId'];
    if (id) {
      this.roomId = id;
    }
  });
    this.rooms = await this.roomService.getRooms();
    this.services = await this.bookingService.getAvailableServices();
    try {
      const user = await this.auth.getCurrentUser();
      this.userId = user.id;
      
    } catch {
      this.router.navigate(['/auth']);
    }
  }
onServiceToggle(service: Service) {
  if (service.IsChecked) {
    this.selectedServiceIds.push(service.id);
  } else {
    this.selectedServiceIds = this.selectedServiceIds.filter((id:any) => id !== service.id);
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
