import { Component } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'szallashely-project';

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
  onClose(sidenav:MatSidenav){
    sidenav.close();
  }
}


