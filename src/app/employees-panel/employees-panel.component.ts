import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminBookingsComponent } from '../admin-bookings/admin-bookings.component';
import { AdminRoomsComponent } from '../admin-rooms/admin-rooms.component';
@Component({
  selector: 'app-employees-panel',
  standalone: true,
  imports: [AdminBookingsComponent,AdminRoomsComponent],
  templateUrl: './employees-panel.component.html',
  styleUrl: './employees-panel.component.css'
})
export class EmployeesPanelComponent {
  activeSection: 'bookings' | 'rooms' | 'users' | 'reviews' = 'bookings';

}
