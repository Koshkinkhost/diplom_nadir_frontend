import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './src/app/auth/AuthService';
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const user = await authService.getCurrentUser();
    return true; // пользователь авторизован — доступ разрешён
  } catch {
    router.navigateByUrl('/auth'); // редирект на вход
    return false;
  }
};
