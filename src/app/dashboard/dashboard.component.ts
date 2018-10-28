import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../services/scheduler.service';
import { Schedule } from '../models/schedule';
import { Actor } from '../models/actor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  countActors: number;
  countTheaters: number;
  scheduleList: Schedule[];
  goodActorList: Actor[];

  constructor(private scheService: SchedulerService) { }

  ngOnInit() {
    this.getActorCount();
    this.getTheaterCount();
    this.getScheduleList();
    this.getGoodActorList();
  }

  getActorCount(): void {
    this.scheService.countActor().subscribe(x => { this.countActors = x; });
  }

  getTheaterCount(): void {
    this.scheService.countTheaters().subscribe(x => { this.countTheaters = x; });
  }

  getScheduleList(): void {
    this.scheService.getFutureSchedules().subscribe(x => { this.scheduleList = x; });
  }

  getGoodActorList(): void {
    this.scheService.getActors().subscribe(actors => {
      let maxRate = 0;
      actors.forEach(x => { maxRate = Math.max(maxRate, x.rating); });
      this.goodActorList = actors.filter(x => x.rating === maxRate);
    });
  }
}
