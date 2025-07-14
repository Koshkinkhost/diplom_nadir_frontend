import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './src/app/auth/AuthService';
export const authGuard: CanActivateFn = async (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const user = await authService.loadCurrentUser(); // ← сначала сохраняем!
    if (user!.id!=0) return true;
    return false;
  } catch {
    return false;
  }
};
