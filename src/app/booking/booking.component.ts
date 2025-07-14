import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomsService } from '../room/RoomService';
import { BookingService } from './BookingService';
import { AuthService } from '../auth/AuthService';
import { Service } from './Service';
import { Room } from '../room/Room';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  services: Service[] = [];
  rooms: Room[] = [];
  roomId: number = 0;
  checkIn: string = '';
  checkOut: string = '';
  guestName: string = '';
  guestEmail: string = '';
  userId: number = 0;

  selectedServiceIds: number[] = [];
  totalAmount: number = 0;

  successMessage = '';
  errorMessage = '';

  constructor(
    private roomService: RoomsService,
    private bookingService: BookingService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    this.route.queryParams.subscribe((params: any) => {
      const id = params['roomId'];
      const name = params['username'];
      this.roomId = +id;
      this.guestName = name ?? '';
    });

    this.rooms = await this.roomService.getRooms();
    this.services = await this.bookingService.getAvailableServices();

    try {
      const user = await this.auth.getCurrentUser();
      this.userId = user.id;
    } catch {
      this.router.navigate(['/auth']);
    }

    this.updateTotalAmount();
  }

  onServiceToggle(service: Service) {
    if (service.IsChecked) {
      this.selectedServiceIds.push(service.id);
    } else {
      this.selectedServiceIds = this.selectedServiceIds.filter(id => id !== service.id);
    }
    this.updateTotalAmount();
  }

  private updateTotalAmount() {
    const room = this.rooms.find(r => r.id === this.roomId);
    const roomPrice = room?.pricePerNight ?? 0;

    const selectedServices = this.services.filter(s => this.selectedServiceIds.includes(s.id));
    const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);

    this.totalAmount = roomPrice + servicesTotal;
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
        Status: "Created",
        Amount: this.totalAmount,
        Services: this.selectedServiceIds
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
