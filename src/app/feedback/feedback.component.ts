import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking/BookingService';
import { Booking } from '../booking/Booking';
import { FeedbackService } from './Feedbackservice';
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  bookings: Booking[] = [];
  selectedBookingId: string = '';
  rating: number = 0;
  comment: string = '';
  success: boolean = false;

  constructor(private bookingService: BookingService,private feedbackService: FeedbackService
  ) {}

  async ngOnInit() {
    try {
      this.bookings = await this.bookingService.getAllBookings();
    } catch (error) {
      console.error('Ошибка при получении бронирований:', error);
    }
  }

  async submitFeedback() {
  if (!this.selectedBookingId || !this.rating || !this.comment.trim()) return;

  try {
    await this.feedbackService.submitFeedback({
      bookingId: this.selectedBookingId,
      rating: this.rating,
      comment: this.comment
    });

    this.success = true;
    this.rating = 0;
    this.comment = '';
  } catch (error) {
    console.error('Ошибка при отправке отзыва:', error);
  }
}

}
