import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/AuthService';
@Component({
  selector: 'app-staff-only',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-only.component.html',
  styleUrl: './staff-only.component.css'
})
export class StaffOnlyComponent {
    constructor(private authService: AuthService, private router: Router) {}

email = '';
  password = '';
  error = '';
  success = '';
  async login() {
    this.error = '';
    this.success = '';

    try {
      const res = await this.authService.loginStaff(this.email, this.password);
      this.success = 'Успешный вход';
      if (res === 'Manager') {
        await this.router.navigate(['/employees']);
      } else {
        this.error = 'Недостаточно прав';
      }
    } catch (err: any) {
      this.error = err.message || 'Ошибка входа';
    }
  }
}
