import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActorsComponent } from './actors/actors.component';
import { TheatersComponent } from './theaters/theaters.component';
import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingComponent } from './rating/rating.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { TheaterDetailComponent } from './theater-detail/theater-detail.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActorsComponent,
    TheatersComponent,
    RatingComponent,
    ActorDetailComponent,
    TheaterDetailComponent,
    ScheduleComponent,
    ScheduleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
