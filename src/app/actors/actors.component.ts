import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/actor';
import { faPlus, faEdit, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SchedulerService } from '../services/scheduler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  actors: Actor[];

  // font awesome
  faPlus = faPlus;
  faEdit = faEdit;
  faStar = faStar;
  faTrash = faTrash;

  constructor(public scheService: SchedulerService, private router: Router) {
  }

  ngOnInit() {
    this.getActors();
  }

  getActors() {
    this.scheService.getActors().subscribe(actors => this.actors = actors);
  }

  onAddActor() {
    this.router.navigate(['actorDetail', '_']);
  }

  onDeleteActor(id) {
    console.log(`delete actor of (${id})`);
    this.scheService.deleteActor(id).subscribe(actor => {});
    this.actors = this.actors.filter(x => x._id !== id);
  }
}
