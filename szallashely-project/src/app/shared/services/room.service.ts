import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { room } from '../models/room';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { ReservationService } from './reservation.service';
import { reservation } from '../models/reservation';
import { Timestamp } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  collectionName = 'Rooms';

  constructor(private afs: AngularFirestore, private reservationService: ReservationService) { }

  create(room: room){
    return this.afs.collection<room>(this.collectionName).doc(room.id).set(room);
  }
  delete(id: string){
    return this.afs.collection<room>(this.collectionName).doc(id).delete();

  }
  update(room: room){
    return this.afs
      .collection<room>(this.collectionName)
      .doc(room.id)
      .set(room);
  }
  getAll() : Observable<room[]>{
    return this.afs.collection<room>(this.collectionName).valueChanges();
  }
  getById(id: string){
    return this.afs.collection<room>(this.collectionName).doc(id).valueChanges();
  }
  checkAvailability(roomId: string, startDate: Date, endDate: Date): Observable<boolean> {
    return this.reservationService.getReservationsByRoomId(roomId).pipe(
      map((reservations: reservation[]) => {
        return reservations.every((reservation) => {
          const reservationStartDate = reservation.firstday as unknown;
          const reservationEndDate = reservation.lastday as unknown;
          const first = (reservationStartDate as Timestamp).toDate().getTime();
          const last = (reservationEndDate as Timestamp).toDate().getTime();
          return (
            (endDate.getTime() <= first || startDate.getTime() >= last) && (endDate.getTime() > startDate.getTime())
          );
        });
      })
    );
  }

  getDaysBetweenDates(date1: Date, date2: Date): number {
    const oneDayMs = 86400000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();
    const diffMs = Math.abs(date2Ms - date1Ms);
    return Math.floor(diffMs / oneDayMs)+1;
  }

}
