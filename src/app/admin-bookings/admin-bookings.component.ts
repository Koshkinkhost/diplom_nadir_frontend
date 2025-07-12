import { Component, OnInit } from '@angular/core';
  import { AdminBookingService } from './admin-booking.service';
@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [],
templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.css'
})
export class AdminBookingsComponent {
    constructor(private bookingService: AdminBookingService) {}
 bookings: any[] = [];
  error: string = '';
  success: string = '';

  async ngOnInit() {
    await this.loadBookings();
  }

  async loadBookings() {
    try {
      const res = await fetch('http://localhost:5144/api/admin/bookings', {
        credentials: 'include'
      });

      if (!res.ok) throw new Error(await res.text());
      this.bookings = await res.json();
    } catch (err: any) {
      this.error = err.message || 'Ошибка загрузки бронирований';
    }
  }

  async deleteBooking(id: number) {
    if (!confirm('Удалить бронирование?')) return;

    try {
      const res = await fetch(`http://localhost:5144/api/admin/bookings/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!res.ok) throw new Error(await res.text());
      this.success = 'Бронирование удалено';
      await this.loadBookings();
    } catch (err: any) {
      this.error = err.message || 'Ошибка при удалении';
    }
  }

  async confirmBooking(id: number) {
    try {
      const booking = this.bookings.find(b => b.id === id);
      const updatedBooking = {
        id:booking.id,
      guestName: booking.guestName,
      room: booking.room,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      status: 'Confirmed'
    };
      const res = await fetch(`http://localhost:5144/api/admin/bookings/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
    'Content-Type': 'application/json'
  },
        body: JSON.stringify(updatedBooking)
      });

      if (!res.ok) throw new Error(await res.text());
      this.success = 'Бронирование подтверждено';
      await this.loadBookings();
    } catch (err: any) {
      this.error = err.message || 'Ошибка при подтверждении';
    }
  }
}
