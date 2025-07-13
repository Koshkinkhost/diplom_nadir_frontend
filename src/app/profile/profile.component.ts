import { Component } from '@angular/core';
import { AuthService } from '../auth/AuthService';
import { Router } from '@angular/router';
import { MyBookingsComponent } from '../my-bookings/my-bookings.component';
import { FeedbackComponent } from '../feedback/feedback.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MyBookingsComponent,FeedbackComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 userName = '';
  userEmail = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}
  activeTab: 'profile' | 'bookings' | 'settings'|'feedback' = 'profile';

  async ngOnInit() {
    try {
      const user = await this.authService.getCurrentUser();
      this.userName = user.name;
      this.userEmail = user.email;
    } catch (err: any) {
      this.error = err.message;
      await this.router.navigateByUrl('/contact'); 
    }
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigateByUrl('/');
  }
}
