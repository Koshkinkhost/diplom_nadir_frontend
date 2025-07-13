import { Injectable } from '@angular/core';
import { FeedbackDto } from './FeedbackDTO';
// или просто описывай здесь интерфейс, если без модели

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly apiUrl = 'http://localhost:5144/api/bookings';

  async submitFeedback(feedback: FeedbackDto): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      credentials: 'include', // если используется куки для авторизации
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedback)
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`Ошибка при отправке отзыва: ${msg}`);
    }
  }
}
