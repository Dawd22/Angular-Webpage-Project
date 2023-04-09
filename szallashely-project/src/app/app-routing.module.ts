import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
{path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) },
{path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
{path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
{path: 'rooms', loadChildren: () => import('./pages/rooms/rooms.module').then(m => m.RoomsModule) },
{path: 'reservation', loadChildren: () => import('./pages/reservation/reservation.module').then(m => m.ReservationModule) },
{path: "", redirectTo:'/main', pathMatch:'full'},
{path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
{path:'**', redirectTo:'/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
