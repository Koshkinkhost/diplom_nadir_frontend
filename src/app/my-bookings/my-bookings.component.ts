import { Component } from '@angular/core';
import { BookingService } from '../booking/BookingService';
import { Booking } from '../booking/Booking';
import { AuthService } from '../auth/AuthService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
 bookings: any[] = [];
  errorMessage = '';

  constructor(private bookingService: BookingService,private auth:AuthService) {}

  async ngOnInit() {
    
    try {
      const Id=await this.auth.loadCurrentUser();
      if(Id){
        console.log(Id.id);
        this.bookings = await this.bookingService.getBooking(Id.id);
      console.log(this.bookings);
      }
      
      // Здесь можно будет отфильтровать по текущему пользователю, если API не делает это сам
    } catch (error: any) {
      this.errorMessage = error.message || 'Не удалось загрузить бронирования';
    }
  }
}
