import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SignupModule { }
