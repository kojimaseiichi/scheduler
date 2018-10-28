import { Component, OnInit } from '@angular/core';
import { Schedule } from '../models/schedule';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SchedulerService } from '../services/scheduler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedules: Schedule[];

  // font awesome
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private scheService: SchedulerService, private router: Router) { }

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule(): void {
    this.scheService.getSchedules().subscribe(schedules => this.schedules = schedules);
  }

  onAddSchedule(): void {
    this.router.navigate(['scheduleDetail', '_']);
  }

  onDeleteSchedule(id): void {
    console.log(`delete schedule of (${id})`);
    this.scheService.deleteSchedule(id).subscribe(schedule => {});
    this.schedules = this.schedules.filter(x => x._id !== id);
  }
}
