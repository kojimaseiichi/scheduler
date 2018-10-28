import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedulerService } from '../services/scheduler.service';
import { Schedule } from '../models/schedule';
import { Location } from '@angular/common';
import { NgbDateStruct, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actor } from '../models/actor';
import { Theater } from '../models/theater';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css'],
  providers: []
})
export class ScheduleDetailComponent implements OnInit {

  @Input() @Output() schedule: Schedule;
  actorList: Actor[];
  theaterList: Theater[];
  newSchedule: boolean;
  scheduleId: string;
  executionName: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private scheService: SchedulerService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.scheduleId = this.route.snapshot.paramMap.get('id');
    this.newSchedule = this.scheduleId === '_';
    console.log(this.newSchedule);
    if (this.newSchedule === true) {
      this.initSchedule();
      this.executionName = '作成';
      console.log('作成');
    } else {
      this.getSchedule();
      this.executionName = '更新';
      console.log('更新');
    }
  }

  initSchedule(): void {
    this.schedule = new Schedule();
    this.schedule.actor = new Actor();
    this.schedule.theater = new Theater();
    this.scheService.getActors().subscribe(actors => this.actorList = actors);
    this.scheService.getTheaters().subscribe(theaters => this.theaterList = theaters);
  }

  getSchedule(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.scheService.getSchedule(id).subscribe(schedule => this.schedule = schedule);
    this.scheService.getActors().subscribe(actors => this.actorList = actors);
    this.scheService.getTheaters().subscribe(theaters => this.theaterList = theaters);
  }

  goBack(): void {
    this.location.back();
  }

  openTheaterList(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.scheService.getTheater(result).subscribe(theater => this.schedule.theater = theater);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  openActorList(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.scheService.getActor(result).subscribe(actor => this.schedule.actor = actor);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  execute(): void {
    if (this.newSchedule === true) {
      this.scheService.createSchedule(this.schedule).subscribe(theater => { });
    } else {
      this.scheService.updateSchedule(this.schedule).subscribe(theater => { });
    }
    this.goBack();
  }

}
