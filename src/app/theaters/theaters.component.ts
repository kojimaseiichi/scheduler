import { Component, OnInit } from '@angular/core';
import { Theater } from '../models/theater';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SchedulerService } from '../services/scheduler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css']
})
export class TheatersComponent implements OnInit {

  theaters: Theater[];

  // font awesome
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private scheService: SchedulerService, private router: Router) { }

  ngOnInit() {
    this.getTheaters();
  }

  getTheaters(): void {
    this.scheService.getTheaters().subscribe(theaters => this.theaters = theaters);
  }

  onAddTheater(): void {
    this.router.navigate(['theaterDetail', '_']);
  }

  onDeleteTheater(id): void {
    console.log(`delete theater of (${id})`);
    this.scheService.deleteTheater(id).subscribe(theater => {});
    this.theaters = this.theaters.filter(x => x._id !== id);
  }
}
