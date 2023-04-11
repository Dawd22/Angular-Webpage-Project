import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
const routes: Routes = [
{path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) },
{path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
{path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
{path: 'rooms', loadChildren: () => import('./pages/rooms/rooms.module').then(m => m.RoomsModule), canActivate:[AuthGuard]},
{path: 'reservation', loadChildren: () => import('./pages/reservation/reservation.module').then(m => m.ReservationModule), canActivate:[AuthGuard] },
{path: '', redirectTo:'/main', pathMatch:'full'},
{path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
{path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuard] },
{path:'**', redirectTo:'/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
