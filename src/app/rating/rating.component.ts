import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actor } from '../models/actor';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {


  @Input()
  rating: number;

  @Output()
  ratingChange = new EventEmitter<number>();

  @Input()
  readonly: boolean;

  constructor() {
    this.readonly = false;
  }

  ngOnInit() {
    if (!this.rating) {
      this.rating = 3;
    }
  }

  change(value) {
    console.log(`value change ${value}`);
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

}
