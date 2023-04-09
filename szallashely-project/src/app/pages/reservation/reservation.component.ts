import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { reservation } from 'src/app/shared/models/reservation';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { Timestamp } from 'firebase/firestore'
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit{
  reservations$: Observable<reservation[]>;
  constructor(private authService: AuthService, private reservationService: ReservationService){};
  ngOnInit(): void {
    this.reservations$ = this.reservationService.getAllByEmail().pipe(
      map(reservations => {
        return reservations.map(reservation => {
          const firstday = reservation.firstday as unknown;
          const lastday = reservation.lastday as unknown;
          return {
            ...reservation,
            firstday: (firstday as Timestamp).toDate(),
            lastday: (lastday as Timestamp).toDate(),
          };
        });
      })
    );
  }
}
