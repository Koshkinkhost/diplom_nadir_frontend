import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5144/api/auth';
private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();
  
  // Регистрация
  async register(name: string, email: string, password: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Ошибка регистрации');
    }

    return res.text();
  }
   async register_admin(name: string, email: string, password: string): Promise<string> {
    const res = await fetch(`http://localhost:5144/api/staff/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Ошибка регистрации');
    }

    return res.text();
  }
  async loadCurrentUser() {
  try {
    const user = await this.getCurrentUser();
    this.userSubject.next(user);
    console.log(user);
    return user;
  } catch {
    this.userSubject.next(null);
    return null;
  }
}

  // Вход
  async login(email: string, password: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Ошибка входа');
    }

    return res.text();
  }
  

  // Выход
  async logout(): Promise<string> {
    const res = await fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!res.ok) {
      throw new Error('Ошибка при выходе');
    }
  this.userSubject.next(null);


    return res.text();
  }

  // Получить текущего пользователя
  async getCurrentUser(): Promise<{ id: number; name: string; email: string }> {
  const res = await fetch(`${this.baseUrl}/me`, {
    credentials: 'include'
  });

  if (res.status === 401) {
    throw new Error('Не авторизован');
  }

  if (!res.ok) {
    throw new Error('Ошибка получения пользователя');
  }

  return res.json();
}

  async loginStaff(email: string, password: string): Promise<string> {
  const res = await fetch(`http://localhost:5144/api/staff/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error(await res.text());
  const data=await res.json()
  console.log(data);
  return data.role; // например, "admin"
}

}
