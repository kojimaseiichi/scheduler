import { Component, OnInit, Input } from '@angular/core';
import { Theater } from '../models/theater';
import { ActivatedRoute } from '@angular/router';
import { SchedulerService } from '../services/scheduler.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-theater-detail',
  templateUrl: './theater-detail.component.html',
  styleUrls: ['./theater-detail.component.css']
})
export class TheaterDetailComponent implements OnInit {

  theater: Theater;
  newTheater: boolean;
  theaterId: string;
  executionName: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public scheService: SchedulerService) { }

  ngOnInit() {
    this.theaterId = this.route.snapshot.paramMap.get('id');
    this.newTheater = this.theaterId === '_';
    console.log(this.newTheater);
    if (this.newTheater === true) {
      this.theater = new Theater();
      this.executionName = '作成';
      console.log('作成');
    } else {
      this.getTheater();
      this.executionName = '更新';
      console.log('更新');
    }
  }

  getTheater() {
    const id = this.route.snapshot.paramMap.get('id');
    this.scheService.getTheater(id).subscribe(theater => this.theater = theater);
  }

  goBack(): void {
    this.location.back();
  }

  execute(): void {
    if (this.newTheater === true) {
      this.scheService.createTheater(this.theater).subscribe(theater => { });
    } else {
      this.scheService.updateTheater(this.theater).subscribe(theater => { });
    }
    this.goBack();
  }
}
