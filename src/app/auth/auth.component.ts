import { Component } from '@angular/core';
import { AuthService } from './AuthService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { User } from './User';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;

  name = '';
  email = '';
  password = '';

  message = '';
  error = '';
  user$!: Observable<User | null>; // объявляем, но не инициализируем здесь

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$; // теперь authService инициализирован
  }

  async ngOnInit() {
    const user = await this.authService.loadCurrentUser();
    if (user) {
      await this.router.navigate(['/profile']);
    }
  }
  async submit() {
    this.message = '';
    this.error = '';

    try {
      if (this.isLoginMode) {
        await this.authService.login(this.email, this.password);
        await this.authService.loadCurrentUser();
        await this.router.navigate(['/profile']);
      } else {
        this.message = await this.authService.register(
          this.name,
          this.email,
          this.password
        );
      }
    } catch (err: any) {
      this.error = err.message || 'Ошибка';
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
    this.error = '';
  }
}
