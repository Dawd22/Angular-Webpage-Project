import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { room } from 'src/app/shared/models/room';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  room: Observable<room[]>;

  constructor(private roomService: RoomService){}
  ngOnInit(): void {
    this.room = this.roomService.getAll();
  }

  delete(roomId: string){
    this.roomService.delete(roomId);
  }
  add(){}
  update(){

  }
}
