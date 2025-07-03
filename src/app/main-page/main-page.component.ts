import { Component } from '@angular/core';
import { RoomsService } from '../room/RoomService';
import { Room } from '../room/Room';
import { CommonModule } from '@angular/common'
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
 popularRooms: Room[] = [];
  private roomsService = new RoomsService();

  async ngOnInit() {
    try {
      this.popularRooms = await this.roomsService.getPopularRooms(3);
    } catch (error) {
      console.error('Ошибка загрузки популярных комнат', error);
    }
  }
}
