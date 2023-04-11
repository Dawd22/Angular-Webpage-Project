import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';


@NgModule({
  declarations: [
    ReservationComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ]

})
export class ReservationModule { }
