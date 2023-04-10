import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }

  isUserLoggedIn() {
    return this.auth.user;
  }
  getCurrentUserEmail(): Observable<string | null> {
    return this.auth.authState.pipe(map((user) => user?.email || null));
  }
  isAdmin(uid: string): Observable<boolean> {
    return this.firestore
      .doc<User>(`users/${uid}`)
      .valueChanges()
      .pipe(map((user) => user?.type === 'admin'));
  }
}
