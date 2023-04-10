import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'szallashely-project';

  loggedInUser?: firebase.default.User | null;
  isAdmin$: Observable<boolean>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        console.log(user);
        this.loggedInUser = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
  onClose(sidenav: MatSidenav) {
    sidenav.close();
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Kijelentkeztél');
    }).catch(error =>{console.error(error);});
  }
}
