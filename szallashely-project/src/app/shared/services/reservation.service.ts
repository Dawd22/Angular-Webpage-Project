import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { reservation } from '../models/reservation';
import { AuthService } from './auth.service';
import { Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ReservationService {
  collectionName = 'Reservations';

  constructor(private afs: AngularFirestore, private authService: AuthService) { }
  create(reservation: reservation){
    reservation.id = this.afs.createId();
    return this.afs.collection<reservation>(this.collectionName).doc(reservation.id).set(reservation);
  }
  delete(id: string){
    return this.afs.collection<reservation>(this.collectionName).doc(id).delete();

  }
  update(room: reservation){
    return this.afs
      .collection<reservation>(this.collectionName)
      .doc(room.id)
      .set(room);
  }
  getAll(){
    return this.afs.collection<reservation>(this.collectionName).valueChanges();
  }
  getById(id: string){
    return this.afs.collection<reservation>(this.collectionName).doc(id).valueChanges();
  }
  getReservationsByRoomId(roomId: string): Observable<reservation[]>{
    return this.afs.collection<reservation>(this.collectionName, ref => ref.where('room_id','==', roomId)).valueChanges();
  }
  getAllByEmail(): Observable<reservation[]> {
    return this.authService.getCurrentUserEmail().pipe(
      switchMap(email => {
        return this.afs.collection<reservation>(this.collectionName, ref => ref.where('user_email', '==', email)).valueChanges();
      })
    );
  }
}

