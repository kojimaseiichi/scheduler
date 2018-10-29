import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActorsComponent } from './actors/actors.component';
import { TheatersComponent } from './theaters/theaters.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { TheaterDetailComponent } from './theater-detail/theater-detail.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';

// ルーティングを定義
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'schedules', component: ScheduleComponent },
  { path: 'actors', component: ActorsComponent },
  { path: 'theaters', component: TheatersComponent },
  { path: 'schedules/detail/:id', component: ScheduleDetailComponent },
  { path: 'actors/detail/:id', component: ActorDetailComponent },
  { path: 'theaters/detail/:id', component: TheaterDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
