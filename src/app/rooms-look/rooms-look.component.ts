import { Component } from '@angular/core';
import { RoomsService } from '../room/RoomService';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Room } from '../room/Room';
import { AuthService } from '../auth/AuthService';
@Component({
  selector: 'app-rooms-look',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rooms-look.component.html',
  styleUrl: './rooms-look.component.css'
})
export class RoomsLookComponent {
rooms: Room[] = [];
  errorMessage = '';
user:any;
  constructor(private roomService: RoomsService,public authservice:AuthService) {}

  async ngOnInit() {
    try {
      this.user=await this.authservice.getCurrentUser();
      console.log("pw,rpv,eprv",this.user);
      this.rooms = await this.roomService.getRooms();
      console.log(this.rooms);
    } catch (err) {
      this.errorMessage = 'Не удалось загрузить список номеров';
    }
  }
}
