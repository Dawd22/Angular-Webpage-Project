import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { room } from 'src/app/shared/models/room';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  rooms: Observable<room[]>;
  selectedRoom: room;
  addRoom: boolean;

  roomForm = new FormGroup({
    hotel: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    location: new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    })

  });

  constructor(private roomService: RoomService, private afs: AngularFirestore){}
  ngOnInit(): void {
    this.rooms = this.roomService.getAll();
    const rSub= this.roomService.getAll().subscribe((rooms) => {
      this.selectedRoom = rooms[0];
      rSub.unsubscribe;
    });
    this.addRoom = false;
  }
  
  selectRoomById(roomId: string): void {
    const rSub = this.roomService.getById(roomId).subscribe((room) => {
      this.selectedRoom = room;
      console.log(room);
      rSub.unsubscribe();
    });
  }
  delete(roomId: string){
    this.roomService.delete(roomId);
  }
  add(): void {
    const newRoom: room = {
      id: this.afs.createId(),
      hotel: this.roomForm.value.hotel,
      type: this.roomForm.value.type,
      price: parseInt(this.roomForm.value.price),
      location: {
        country: this.roomForm.value.location.country,
        city: this.roomForm.value.location.city
      }
    };
  
    this.roomService.create(newRoom).then(() => {
      this.changeAddRoom();
    });
  }
  
  

  update() {
    this.roomService.update(this.selectedRoom).then(() => {
      alert('Sikeres frissítés!');
    }).catch((error) => {
      alert('Hiba történt a frissítés során');
    });
  }
  changeAddRoom(){
    this.addRoom= !this.addRoom;
  }
}
