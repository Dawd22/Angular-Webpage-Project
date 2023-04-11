import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from './shared/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, OnChanges{
  title = 'szallashely-project';
  isAdmin$: boolean;
  loggedInUser?: firebase.default.User | null;
  constructor(private authService: AuthService , private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isAdmin();
  }
  ngOnDestroy(): void {
    this.isAdmin();
    
  }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        console.log(user);
        this.loggedInUser = user;
        localStorage.setItem('user',JSON.stringify(this.loggedInUser));
        this.isAdmin();
      },
      (error) => {
        console.error(error);
        localStorage.setItem('user', JSON.stringify('null'));
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
  isAdmin(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const adminServ = this.userService.getById(parsedUser.uid).subscribe((user) =>{
        const selectUser = user;
        console.log(selectUser.type);
        if(selectUser.type === 'admin'){
          console.log(selectUser.type);
          this.isAdmin$ = true;
          adminServ.unsubscribe();
        }
        else{
          console.log(selectUser.type);
          this.isAdmin$ = false;
          adminServ.unsubscribe();
        }
      });
    }
    
    return this.isAdmin$;
  }
}
