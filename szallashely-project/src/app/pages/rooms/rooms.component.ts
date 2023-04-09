import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { reservation } from 'src/app/shared/models/reservation';
import { room } from 'src/app/shared/models/room';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  @ViewChild('firstdayInput') firstdayInput: ElementRef;
  @ViewChild('lastdayInput') lastdayInput: ElementRef;
  room: Observable<room[]>;
  userEmail: Observable<string | null>;
  userEmailSubscription: Subscription;
  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private reservationService: ReservationService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.userEmailSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.room = this.roomService.getAll();
    this.userEmail = this.authService.getCurrentUserEmail();
    this.userEmailSubscription = this.userEmail.subscribe();
  }
  book(firstday: string, lastday: string, id: string) {
    this.userEmailSubscription = this.userEmail.subscribe((email) => {
      if (!email) {
        console.log('Csak bejelentkezett felhasználók foglalhatnak!');
      } else if (lastday == '' || firstday == '') {
        console.log('Tölts ki minden mezőt!');
      } else {
        const roomSubscribe = this.roomService.getById(id).subscribe((room) => {
          const selectedRoom = room;
          console.log(`Foglalás a(z) ${selectedRoom.id} azonosítójú ${selectedRoom.type} szobára a következő időszakra:
           ${firstday} - ${lastday} user email címe: ${email}
           ár: ${selectedRoom.price} ország: ${selectedRoom.location.country} város: ${selectedRoom.location.city}`);

          const reservation = {
            id: '',
            room_id: selectedRoom.id,
            room_type: selectedRoom.type,
            room_hotel: selectedRoom.hotel,
            full_price: selectedRoom.price,
            firstday: new Date(firstday),
            lastday: new Date(lastday),
            user_email: email,
          };
          roomSubscribe.unsubscribe();
          reservation.firstday.setHours(14, 0, 0);
          reservation.lastday.setHours(9, 0, 0);
          reservation.full_price =
            reservation.full_price *
            this.roomService.getDaysBetweenDates(
              reservation.firstday,
              reservation.lastday
            );
            console.log(this.roomService.getDaysBetweenDates(
              reservation.firstday,
              reservation.lastday
            ));
          const availabilitySubscription = this.roomService
            .checkAvailability(id, reservation.firstday, reservation.lastday)
            .subscribe((isAvailable) => {
              availabilitySubscription.unsubscribe();
              if (isAvailable) {
                this.reservationService
                  .create(reservation)
                  .then(() => {
                    alert('Foglalás sikeresen létrehozva.');
                  })
                  .catch((error) => {
                    console.error(
                      'Hiba történt a foglalás létrehozása során:',
                      error
                    );
                  });
              } else {
                alert(
                  'A szoba foglalt az adott időszakra. Kérlek válassz másik időszakot vagy szobát!'
                );
              }
            });
        });
      }
    });
  }
}
