import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { MainPageComponent } from './main-page/main-page.component';
import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from '../../auth.guard';
import { ProfileComponent } from './profile/profile.component';
export const routes: Routes = [
    {
        path:'',
        component:MainPageComponent
    },
    {
        path:'booking',
        component:BookingComponent
    },
    {
        path:"auth",
        component:AuthComponent
    },
      { path: 'profile', component: ProfileComponent,canActivate: [authGuard] },

];
