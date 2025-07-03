import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/AuthService';
import { User } from '../auth/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string = 'Гость';
  private sub?: Subscription;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.sub = this.auth.user$.subscribe(user => {
      if (user) {
        this.userName = user.name || user.email || 'Гость';
      } else {
        this.userName = 'Гость';
      }
    });

    // Можно загрузить пользователя при инициализации
    this.auth.loadCurrentUser();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
