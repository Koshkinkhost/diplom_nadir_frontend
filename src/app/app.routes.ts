import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { MainPageComponent } from './main-page/main-page.component';
import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from '../../auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { RoomsLookComponent } from './rooms-look/rooms-look.component';
import { StaffOnlyComponent } from './staff-only/staff-only.component';
import { EmployeesPanelComponent } from './employees-panel/employees-panel.component';
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
      {
         path:"rooms",
        component:RoomsLookComponent
      },
      {
        path:'staff',
        component:StaffOnlyComponent
      },
      {
        path:'employees',
        component:EmployeesPanelComponent
      }

];
